const tagService = {
    tags: [],
    activeDropdown: null,
    triggerButton: null,
    isProcessing: false,

    showTagManager(clienteId, event) {
        event.stopPropagation();
        
        // Se já existe um dropdown aberto
        if (this.activeDropdown) {
            this.closeDropdown(true);
            // Se for o mesmo botão, apenas fecha
            if (this.triggerButton === event.currentTarget) {
                return;
            }
        }
        
        this.triggerButton = event.currentTarget;
        this.openDropdown(clienteId);
    },
    
    openDropdown(clienteId) {
        // Criar backdrop semi-transparente para a página (sem backdrop, apenas o dropdown)
        
        // Criar container do dropdown
        const dropdown = document.createElement('div');
        dropdown.className = 'fixed z-50 bg-white dark:bg-gray-800 rounded-md shadow-xl w-72 border border-gray-200 dark:border-gray-700 overflow-hidden animate-scale-in';
        dropdown.id = 'tag-dropdown';
        dropdown.dataset.clientId = clienteId;
        
        // Conteúdo do dropdown
        dropdown.innerHTML = `
            <div class="p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <h3 class="font-medium text-gray-900 dark:text-white">Gerenciar Tags</h3>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Adicione ou remova tags para este cliente</p>
            </div>
            
            <div class="p-3">
                <div class="relative mb-3">
                    <input type="text" 
                        placeholder="Adicionar nova tag..." 
                        class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900/40 rounded-md border border-gray-200 dark:border-gray-700 text-sm outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
                        id="new-tag-input">
                    <button class="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md bg-primary-500 text-white hover:bg-primary-600 transition-colors" id="add-tag-btn">
                        <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                        </svg>
                        <svg class="w-3 h-3 hidden animate-spin" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                        </svg>
                    </button>
                </div>
                
                <div class="max-h-60 overflow-y-auto" id="tags-list">
                    ${this.renderTagsList(clienteId)}
                </div>
            </div>
        `;
        
        document.body.appendChild(dropdown);
        this.activeDropdown = dropdown;
        
        // Posicionar dropdown abaixo do botão que o acionou
        this.positionDropdownNearTrigger();
        
        // Inicializar eventos
        this.initDropdownEvents(clienteId);
        
        // Focar o input
        setTimeout(() => {
            dropdown.querySelector('input').focus();
        }, 100);
    },
    
    positionDropdownNearTrigger() {
        const dropdown = this.activeDropdown;
        const trigger = this.triggerButton;
        if (!dropdown || !trigger) return;
        
        // Obter as dimensões e a posição do trigger e do dropdown
        const triggerRect = trigger.getBoundingClientRect();
        const dropdownWidth = dropdown.offsetWidth;
        const dropdownHeight = dropdown.offsetHeight;
        
        // Obter as dimensões do viewport
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
        
        // Posição inicial: abaixo e alinhado à esquerda do botão
        let top = triggerRect.bottom + scrollTop;
        let left = triggerRect.left + scrollLeft;
        
        // Verificar se o dropdown vai sair da janela pela direita
        if (left + dropdownWidth > viewportWidth) {
            // Alinhar à direita do botão
            left = triggerRect.right + scrollLeft - dropdownWidth;
            
            // Se ainda estiver fora, empurrar para a esquerda até ficar visível
            if (left < 10) {
                left = 10;
            }
        }
        
        // Verificar se o dropdown vai sair pela parte inferior
        if (top + dropdownHeight > scrollTop + viewportHeight) {
            // Colocar acima do botão em vez de abaixo
            top = triggerRect.top + scrollTop - dropdownHeight;
            
            // Se também não couber acima, posicionar de forma a mostrar o máximo possível
            if (top < scrollTop + 10) {
                top = viewportHeight + scrollTop - dropdownHeight - 10;
            }
        }
        
        // Aplicar a posição calculada
        dropdown.style.top = `${top}px`;
        dropdown.style.left = `${left}px`;
    },
    
    renderTagsList(clienteId) {
        const cliente = stateService.clientes.find(c => c.id === clienteId);
        if (!cliente || !this.tags.length) {
            return `<div class="text-center py-4 text-sm text-gray-500 dark:text-gray-400">Nenhuma tag disponível</div>`;
        }
        
        return `
            <div class="space-y-1.5">
                ${this.tags.map(tag => {
                    const hasTag = cliente.tags.some(t => t.id === tag.id);
                    return `
                        <div class="flex items-center justify-between p-2 rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50 group">
                            <div class="flex items-center gap-2">
                                <span class="w-3 h-3 rounded-full" style="background-color: ${tag.cor}"></span>
                                <span class="text-sm text-gray-800 dark:text-gray-200">${tag.nome}</span>
                            </div>
                            
                            <button 
                                class="tag-toggle ${hasTag ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'} rounded-full p-1.5 transition-colors hover:shadow-sm"
                                data-tag-id="${tag.id}"
                                data-action="${hasTag ? 'remove' : 'add'}">
                                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    ${hasTag 
                                        ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>` 
                                        : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>`
                                    }
                                </svg>
                                <svg class="w-3 h-3 hidden animate-spin" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                </svg>
                            </button>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    },
    
    closeDropdown(skipAnimation = false) {
        if (!this.activeDropdown) return;
        
        const dropdown = this.activeDropdown;
        
        if (skipAnimation) {
            dropdown.remove();
            this.activeDropdown = null;
            this.triggerButton = null;
            return;
        }
        
        // Animar saída
        dropdown.classList.add('animate-fade-out');
        
        setTimeout(() => {
            dropdown.remove();
            this.activeDropdown = null;
            this.triggerButton = null;
        }, 200);
    },
    
    initDropdownEvents(clienteId) {
        if (!this.activeDropdown) return;
        
        // Adicionar nova tag
        const addBtn = document.getElementById('add-tag-btn');
        const input = document.getElementById('new-tag-input');
        
        if (addBtn && input) {
            // Botão de adicionar
            addBtn.addEventListener('click', () => this.addNewTag(input.value, clienteId));
            
            // Tecla Enter no input
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') this.addNewTag(input.value, clienteId);
            });
            
            // Tecla Escape para fechar
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') this.closeDropdown();
            });
        }
        
        // Vincular/desvincular tags existentes
        const tagButtons = this.activeDropdown.querySelectorAll('.tag-toggle');
        tagButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const tagId = parseInt(btn.dataset.tagId);
                const action = btn.dataset.action;
                this.toggleTag(tagId, clienteId, action === 'remove', btn);
            });
        });
        
        // Fechar ao clicar fora
        document.addEventListener('click', (e) => {
            if (this.activeDropdown && 
                !this.activeDropdown.contains(e.target) && 
                this.triggerButton !== e.target) {
                this.closeDropdown();
            }
        });
        
        // Reposicionar em caso de redimensionamento ou rolagem
        window.addEventListener('resize', this.positionDropdownNearTrigger.bind(this));
        window.addEventListener('scroll', this.positionDropdownNearTrigger.bind(this));
    },
    
    async addNewTag(name, clienteId) {
        if (!name || name.trim() === '' || this.isProcessing) return;
        
        const trimmedName = name.trim();
        this.isProcessing = true;
        
        try {
            const addBtn = document.getElementById('add-tag-btn');
            const input = document.getElementById('new-tag-input');
            
            // Mostrar spinner
            if (addBtn) {
                const icon = addBtn.querySelector('svg:not(.animate-spin)');
                const spinner = addBtn.querySelector('svg.animate-spin');
                if (icon) icon.classList.add('hidden');
                if (spinner) spinner.classList.remove('hidden');
                addBtn.disabled = true;
            }
            
            // Desabilitar input
            if (input) input.disabled = true;
            
            // Criar a tag com cor aleatória
            const cor = this.randomHexColor();
            const result = await clientesService.criarTag(trimmedName, cor);
            
            if (result.success) {
                // Adicionar a tag ao state
                this.tags.push(result.data);
                
                // Vincular a tag ao cliente
                await this.toggleTag(result.data.id, clienteId, false);
                
                // Limpar input
                if (input) input.value = '';
                
                // Atualizar lista de tags
                const tagsList = document.getElementById('tags-list');
                if (tagsList) tagsList.innerHTML = this.renderTagsList(clienteId);
                
                // Reiniciar eventos
                this.initDropdownEvents(clienteId);
            }
        } catch (error) {
            console.error('Erro ao criar tag:', error);
        } finally {
            // Restaurar botão
            const addBtn = document.getElementById('add-tag-btn');
            if (addBtn) {
                const icon = addBtn.querySelector('svg:not(.animate-spin)');
                const spinner = addBtn.querySelector('svg.animate-spin');
                if (icon) icon.classList.remove('hidden');
                if (spinner) spinner.classList.add('hidden');
                addBtn.disabled = false;
            }
            
            // Habilitar input
            const input = document.getElementById('new-tag-input');
            if (input) {
                input.disabled = false;
                input.focus();
            }
            
            this.isProcessing = false;
        }
    },
    
    async toggleTag(tagId, clienteId, isRemoving = false, button = null) {
        if (this.isProcessing) return;
        this.isProcessing = true;
        
        try {
            // Mostrar spinner no botão
            if (button) {
                const icon = button.querySelector('svg:not(.animate-spin)');
                const spinner = button.querySelector('svg.animate-spin');
                if (icon) icon.classList.add('hidden');
                if (spinner) spinner.classList.remove('hidden');
                button.disabled = true;
            }
            
            // Chamar a API
            const result = isRemoving 
                ? await clientesService.desvincularTag(tagId, clienteId) 
                : await clientesService.vincularTag(tagId, clienteId);
            
            if (result.success) {
                // Atualizar state local
                stateService.updateTagsLocally(clienteId, tagId, !isRemoving);
                
                // Atualizar lista no dropdown
                const tagsList = document.getElementById('tags-list');
                if (tagsList) tagsList.innerHTML = this.renderTagsList(clienteId);
                
                // Reiniciar eventos
                this.initDropdownEvents(clienteId);
            }
        } catch (error) {
            console.error(`Erro ao ${isRemoving ? 'remover' : 'adicionar'} tag:`, error);
        } finally {
            this.isProcessing = false;
        }
    },

    randomHexColor() {
        const hue = Math.floor(Math.random() * 360);
        const pastel = this.hslToHex(hue, 70, 70);
        return pastel;
    },

    hslToHex(h, s, l) {
        s /= 100;
        l /= 100;
        let c = (1 - Math.abs(2 * l - 1)) * s;
        let x = c * (1 - Math.abs((h / 60) % 2 - 1));
        let m = l - c/2;
        let r = 0, g = 0, b = 0;
        if (0 <= h && h < 60) { r = c; g = x; b = 0; }
        else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
        else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
        else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
        else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
        else if (300 <= h && h < 360) { r = c; g = 0; b = x; }
        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
};

window.tagService = tagService;
