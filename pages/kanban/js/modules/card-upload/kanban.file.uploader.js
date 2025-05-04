export class KanbanFileUploader {
    constructor() {
        this.BUNNY_STORAGE_URL = 'https://br.storage.bunnycdn.com';
        this.STORAGE_ZONE_NAME = 'triks';
        this.API_KEY = 'bc18e66b-bab7-4ed5-ae963b6a77d6-0cb8-4d47';
        this.currentCardId = null;
        this.lastCardId = null;
        this.CDN_URL = 'https://triks.b-cdn.net';
        
        this.setupEventListeners();
        this.initModalObserver();
        this.previousFiles = []; // Controle de arquivos já carregados
        this.init();
        console.log('KanbanFileUploader inicializado');
    }

    init() {
        // Garantir que os containers existam
        const cardModal = document.getElementById('cardModal');
        const mediaFiles = cardModal.querySelector('#mediaFiles');
        const documentFiles = cardModal.querySelector('#documentFiles');
        
        if (!mediaFiles || !documentFiles) {
            console.error('Containers de arquivos não encontrados');
            return;
        }

        // Garantir que as divs internas existam
        if (!mediaFiles.querySelector('.flex')) {
            mediaFiles.innerHTML = '<div class="flex gap-4 py-2"></div>';
        }
        if (!documentFiles.querySelector('.space-y-2')) {
            documentFiles.innerHTML = '<div class="space-y-2"></div>';
        }
    }

    initModalObserver() {
        const cardModal = document.getElementById('cardModal');
        if (cardModal) {
            this.currentCardId = cardModal.getAttribute('data-card-id');
            
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'data-card-id') {
                        this.currentCardId = cardModal.getAttribute('data-card-id');
                    }
                });
            });
            
            observer.observe(cardModal, {
                attributes: true,
                attributeFilter: ['data-card-id']
            });
        }
    }
    
    setupEventListeners() {
        const uploadBtn = document.getElementById('uploadFileBtn');
        const fileInput = document.getElementById('fileInput');

        if (uploadBtn && fileInput) {
            // Remover eventos existentes
            uploadBtn.replaceWith(uploadBtn.cloneNode(true));
            fileInput.replaceWith(fileInput.cloneNode(true));

            // Recuperar as novas referências após clonar
            const newUploadBtn = document.getElementById('uploadFileBtn');
            const newFileInput = document.getElementById('fileInput');

            // Adicionar os eventos uma única vez
            newFileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    this.handleFileUpload(e.target.files[0]);
                }
            });

            newUploadBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                newFileInput.click();
            });
        }
    }
    
    setCurrentCardId(cardId) {
        this.currentCardId = cardId;
    }
    
    async handleFileUpload(file) {
        if (!this.currentCardId) return;

        const progressId = `upload-${Date.now()}`;
        const progressElement = this.createProgressElement(file.name, progressId);
        document.getElementById('uploadProgress').appendChild(progressElement);

        try {
            const filePath = await this.uploadToBunny(file, (progress) => {
                this.updateProgress(progressId, progress);
            });
            
            const formato = this.getFileFormat(file.name);
            await this.registerFileInBackend(file, filePath, formato);
            await this.loadCardFiles(this.currentCardId);
        } catch (error) {
            console.error('Erro no upload:', error);
        } finally {
            setTimeout(() => {
                progressElement.remove();
            }, 1000);
        }
    }

    getFileFormat(filename) {
        const ext = filename.split('.').pop().toLowerCase();
        const imageFormats = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        const videoFormats = ['mp4', 'webm', 'ogg'];
        
        if (imageFormats.includes(ext)) return 'imagem';
        if (videoFormats.includes(ext)) return 'video';
        return ext;
    }

    createProgressElement(fileName, id) {
        const div = document.createElement('div');
        div.id = id;
        div.className = 'flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg animate-fadeIn';
        div.innerHTML = `
            <span class="text-sm text-gray-600 dark:text-gray-300 truncate flex-1">${fileName}</span>
            <div class="w-32 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <div class="progress-bar h-full bg-primary-500 w-0 transition-all duration-300"></div>
            </div>
        `;
        return div;
    }

    updateProgress(id, progress) {
        const element = document.getElementById(id);
        if (element) {
            element.querySelector('.progress-bar').style.width = `${progress}%`;
        }
    }

    async loadCardFiles(cardId) {
        console.log('Carregando arquivos do card:', cardId);
        
        const mediaContainer = document.getElementById('mediaFiles');
        const mediaGrid = mediaContainer.querySelector('.flex');
        const docContainer = document.getElementById('documentFiles');
        
        if (!mediaGrid || !docContainer) {
            console.error('Containers não encontrados:', { mediaGrid, docContainer });
            return;
        }

        try {
            const response = await kanbanService.getCardDetalhes(cardId);
            console.log('Resposta do servidor:', response);

            // Limpar containers
            mediaGrid.innerHTML = '';
            docContainer.innerHTML = '';

            if (!response.success || !response.data.arquivos?.length) {
                mediaContainer.style.display = 'none';
                docContainer.style.display = 'none';
                return;
            }

            let hasMedia = false;
            let hasDocs = false;

            // Processar arquivos
            response.data.arquivos.forEach(arquivo => {
                const ext = arquivo.nome.split('.').pop().toLowerCase();
                
                if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) {
                    hasMedia = true;
                    mediaGrid.appendChild(this.renderMediaFile(arquivo));
                } else {
                    hasDocs = true;
                    docContainer.appendChild(this.renderDocFile(arquivo));
                }
            });

            // Mostrar/esconder containers
            mediaContainer.style.display = hasMedia ? 'block' : 'none';
            docContainer.style.display = hasDocs ? 'block' : 'none';
            
            console.log('Arquivos renderizados:', { hasMedia, hasDocs });

        } catch (error) {
            console.error('Erro ao carregar arquivos:', error);
        }
    }
    
    openPreview(url, formato) {
        const modal = document.getElementById('mediaPreviewModal');
        const content = document.getElementById('mediaPreviewContent');
        
        // Fazer requisição para obter a imagem com autenticação
        fetch(url, {
            headers: {
                'AccessKey': this.API_KEY
            }
        })
        .then(response => {
            if (!response.ok) throw new Error('Erro ao carregar mídia');
            return response.blob();
        })
        .then(blob => {
            const previewUrl = URL.createObjectURL(blob);
            
            content.innerHTML = formato === 'imagem' 
                ? `<img src="${previewUrl}" class="w-full h-auto" alt="Preview">` 
                : `<video src="${previewUrl}" class="w-full h-auto" controls autoplay></video>`;
            
            modal.classList.remove('hidden');
            
            // Limpar URL quando fechar
            const closeModal = () => {
                modal.classList.add('hidden');
                URL.revokeObjectURL(previewUrl);
            };
            
            const closeBtn = document.getElementById('closePreviewModal');
            closeBtn.onclick = closeModal;
            modal.onclick = (e) => {
                if (e.target === modal) closeModal();
            };
        })
        .catch(error => {
            console.error('Erro ao abrir preview:', error);
        });
    }

    renderMediaFile(arquivo) {
        const div = document.createElement('div');
        div.className = 'flex-none w-32 h-32 relative group rounded-lg overflow-hidden';
        
        const cdnUrl = `${this.CDN_URL}/${arquivo.path}`;
        const downloadUrl = `${this.BUNNY_STORAGE_URL}/${this.STORAGE_ZONE_NAME}/${arquivo.path}?accessKey=bc18e66b-bab7-4ed5-ae963b6a77d6-0cb8-4d47&download`;
        
        div.innerHTML = `
            <div class="absolute inset-0">
                <img src="${cdnUrl}" class="w-full h-full object-cover cursor-pointer" alt="${arquivo.nome}">
            </div>
            <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                <div class="absolute inset-0 flex items-center justify-center gap-2">
                    <button class="preview-btn p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                    </button>
                    <a href="${downloadUrl}" target="_blank" class="p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                        </svg>
                    </a>
                </div>
            </div>
        `;

        div.querySelector('.preview-btn').addEventListener('click', () => this.openImagePreview(cdnUrl));
        return div;
    }

    renderDocFile(arquivo) {
        const div = document.createElement('div');
        div.className = 'flex items-center justify-between p-2 bg-gray-50 hover:bg-gray-100 rounded-lg group transition-colors';
        
        const ext = arquivo.nome.split('.').pop().toUpperCase();
        const downloadUrl = `${this.BUNNY_STORAGE_URL}/${this.STORAGE_ZONE_NAME}/${arquivo.path}?accessKey=${this.API_KEY}&download`;
        
        div.innerHTML = `
            <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
                <span class="text-sm text-gray-700">${arquivo.nome}</span>
            </div>
            <a href="${downloadUrl}" target="_blank" class="p-1.5 text-gray-400 hover:text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
            </a>
        `;
        
        return div;
    }

    openImagePreview(imageUrl) {
        const modal = document.getElementById('mediaPreviewModal');
        const content = document.getElementById('mediaPreviewContent');
        const closeBtn = document.getElementById('closeMediaPreview');
        
        if (!modal || !content || !closeBtn) return;

        content.innerHTML = `<img src="${imageUrl}" class="max-w-full max-h-[80vh] object-contain" alt="Preview">`;
        modal.classList.remove('hidden');

        const closeModal = () => {
            modal.classList.add('hidden');
            content.innerHTML = '';
        };

        // Remove listeners anteriores para evitar duplicação
        closeBtn.removeEventListener('click', closeModal);
        modal.removeEventListener('click', closeModal);

        // Adiciona novos listeners
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    async uploadToBunny(file, onProgress) {
        if (!this.currentCardId) {
            throw new Error('ID do card não definido');
        }

        return new Promise((resolve, reject) => {
            const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
            const filePath = `cards/${this.currentCardId}/${fileName}`;  // Adiciona 'cards/' no path
            const uploadUrl = `${this.BUNNY_STORAGE_URL}/${this.STORAGE_ZONE_NAME}/${filePath}`;
            const xhr = new XMLHttpRequest();
            xhr.open('PUT', uploadUrl, true);
            xhr.setRequestHeader('AccessKey', this.API_KEY);
            xhr.setRequestHeader('Content-Type', 'application/octet-stream');
            xhr.setRequestHeader('accept', 'application/json');
            xhr.upload.onprogress = function(event) {
                if (event.lengthComputable) {
                    const progress = (event.loaded / event.total) * 100;
                    onProgress(progress);
                }
            };
            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        if (response.HttpCode === 201 && response.Message === "File uploaded.") {
                            console.log("Upload bem-sucedido:", response);
                            resolve(filePath);
                        } else {
                            reject(new Error(`Resposta inesperada: ${xhr.responseText}`));
                        }
                    } catch (e) {
                        console.log("Resposta não é JSON, mas status é OK:", xhr.responseText);
                        resolve(filePath);
                    }
                } else {
                    reject(new Error(`Erro no upload: ${xhr.status} - ${xhr.responseText}`));
                }
            };
            xhr.onerror = function() {
                reject(new Error('Falha na conexão'));
            };
            xhr.send(file);
        });
    }
    
    async registerFileInBackend(file, bunnyFilePath, formato) {
        try {
            const { API_URL, AUTH_TOKEN } = window.appConfig;
            const data = {
                card_id: this.currentCardId,
                nome: file.name,
                arquivo: bunnyFilePath.split('/').pop(),
                path: bunnyFilePath,
                capa: false,
                ordem: 1,
                formato: formato
            };
            
            console.log("Tentativa de envio para API:", data);
            
            fetch(`${API_URL}/kanban-cards-files`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${AUTH_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                console.log("Status da resposta:", response.status);
                if (response.ok) {
                    console.log("Arquivo registrado com sucesso");
                } else {
                    console.error("Falha ao registrar arquivo:", response.status);
                }
            })
            .catch(err => {
                console.error("Erro na requisição:", err);
            });
            
            return true;
        } catch (error) {
            console.error('Erro ao preparar registro:', error);
            return false;
        }
    }
    
    showNotification(message, type) {
        return; // Desabilita todas as notificações
    }

    renderFiles(arquivos) {
        console.log('Renderizando arquivos:', arquivos);
        const mediaContainer = document.getElementById('mediaFiles');
        const mediaGrid = mediaContainer.querySelector('.flex');
        const docContainer = document.getElementById('documentFiles');
        
        if (!mediaGrid || !docContainer) {
            console.error('Containers não encontrados');
            return;
        }

        // Limpar containers
        mediaGrid.innerHTML = '';
        docContainer.innerHTML = '';

        if (!arquivos?.length) {
            mediaContainer.style.display = 'none';
            docContainer.style.display = 'none';
            return;
        }

        let hasMedia = false;
        let hasDocs = false;

        // Processar arquivos
        arquivos.forEach(arquivo => {
            const ext = arquivo.nome.split('.').pop().toLowerCase();
            if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) {
                hasMedia = true;
                mediaGrid.appendChild(this.renderMediaFile(arquivo));
            } else {
                hasDocs = true;
                docContainer.appendChild(this.renderDocFile(arquivo));
            }
        });

        // Mostrar/esconder containers
        mediaContainer.style.display = hasMedia ? 'block' : 'none';
        docContainer.style.display = hasDocs ? 'block' : 'none';
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.kanbanFileUploader = new KanbanFileUploader();
});
