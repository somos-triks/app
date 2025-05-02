import { ChecklistAnimations } from '../animations.js';

export class ItemRenderer {
    constructor(board, itemActions) {
        this.board = board;
        this.itemActions = itemActions;
    }

    render(container, item) {
        const itemEl = document.createElement('div');
        
        // Aplicar classes com efeito de hover mais pronunciado
        itemEl.className = 'checklist-item flex items-center gap-2 py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg group transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 hover:shadow-sm';
        itemEl.dataset.itemId = item.id;
        
        // Aplicar estilo especial para itens destacados
        if (item.destaque) {
            itemEl.classList.add('bg-yellow-50/50', 'dark:bg-yellow-900/10', 'border-l-2', 'border-yellow-400');
        }
        
        // Aplicar estilo para itens concluídos
        if (item.marcacao) {
            itemEl.classList.add('bg-gray-50', 'dark:bg-gray-800/50');
        }
        
        itemEl.innerHTML = this.getItemTemplate(item);
        this.setupEventListeners(itemEl, item);
        
        // Configurar animação de entrada personalizada
        itemEl.style.opacity = '0';
        itemEl.style.transform = 'translateX(-10px)';
        
        container.appendChild(itemEl);
        
        // Aplicar animação de entrada com atraso baseado na posição
        const items = container.querySelectorAll('.checklist-item');
        const index = Array.from(items).indexOf(itemEl);
        const delay = index * 50; // Atraso crescente para efeito cascata
        
        setTimeout(() => {
            itemEl.style.transition = 'opacity 300ms ease, transform 300ms ease';
            itemEl.style.opacity = '1';
            itemEl.style.transform = 'translateX(0)';
            
            // Remover estilos de transição após animação
            setTimeout(() => {
                itemEl.style.transition = '';
                itemEl.style.transform = '';
            }, 300);
        }, delay);
        
        return itemEl;
    }

    getItemTemplate(item) {
        const prazoHtml = item.data ? this.getPrazoTemplate(item.data) : '';
        const descricaoHtml = item.descricao ? this.getDescricaoTemplate(item.descricao) : '';
        const destaqueClass = item.destaque ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' : 'text-gray-400';
        
        return `
            <button class="toggle-item flex-shrink-0 w-6 h-6 rounded-full border-2 
                ${item.marcacao ? 'bg-primary-500 border-primary-500' : 'border-gray-300 dark:border-gray-600'} 
                hover:border-primary-500 hover:scale-110 transition-all duration-200 flex items-center justify-center">
                ${item.marcacao ? this.getCheckmarkSvg() : ''}
            </button>
            <div class="flex-1 min-w-0 flex items-center gap-2">
                <div class="text-sm text-gray-700 dark:text-gray-200 cursor-pointer break-words flex-1 truncate 
                    ${item.marcacao ? 'line-through text-gray-400 dark:text-gray-500' : ''}" 
                    contenteditable="true">${item.nome}</div>
                ${descricaoHtml}
                ${prazoHtml}
                <button class="toggle-destaque opacity-0 group-hover:opacity-100 flex-shrink-0 text-xs transition-all duration-200 hover:scale-125 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${destaqueClass}">
                    <svg class="w-5 h-5" fill="${item.destaque ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                </button>
                <button class="add-prazo-btn opacity-0 group-hover:opacity-100 flex-shrink-0 text-xs text-gray-400 hover:text-primary-500 transition-all duration-200 hover:scale-125 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${item.data ? 'hidden' : ''}">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                </button>
                <button class="add-descricao-btn opacity-0 group-hover:opacity-100 flex-shrink-0 text-xs text-gray-400 hover:text-primary-500 transition-all duration-200 hover:scale-125 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${item.descricao ? 'hidden' : ''}">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                    </svg>
                </button>
            </div>
            <button class="delete-item opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all duration-200 hover:scale-125 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 flex-shrink-0">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        `;
    }

    setupEventListeners(itemEl, item) {
        this.setupToggleButton(itemEl, item);
        this.setupNomeEditor(itemEl, item);
        this.setupPrazoFunctions(itemEl, item);
        this.setupDescricaoFunctions(itemEl, item);
        this.setupDestaqueButton(itemEl, item);
        this.setupDeleteButton(itemEl, item);
    }

    setupToggleButton(itemEl, item) {
        const toggleBtn = itemEl.querySelector('.toggle-item');
        toggleBtn.addEventListener('click', async () => {
            try {
                const novoStatus = await this.itemActions.toggleMarcacao(item);
                item.marcacao = novoStatus;
                toggleBtn.innerHTML = novoStatus ? this.getCheckmarkSvg() : '';
                toggleBtn.classList.toggle('bg-primary-500', novoStatus);
                toggleBtn.classList.toggle('border-primary-500', novoStatus);
                
                // Anima o item completo com efeito mais visual
                if (novoStatus) {
                    // Efeito de marcação com animação mais pronunciada
                    itemEl.classList.add('bg-gray-50', 'dark:bg-gray-800/50');
                    const textElement = itemEl.querySelector('.text-sm');
                    textElement.classList.add('line-through', 'text-gray-400', 'dark:text-gray-500');
                    
                    // Animação de conclusão personalizada
                    toggleBtn.classList.add('scale-125');
                    setTimeout(() => {
                        toggleBtn.classList.remove('scale-125');
                    }, 300);
                } else {
                    // Remover estilos de item concluído
                    itemEl.classList.remove('bg-gray-50', 'dark:bg-gray-800/50');
                    const textElement = itemEl.querySelector('.text-sm');
                    textElement.classList.remove('line-through', 'text-gray-400', 'dark:text-gray-500');
                }
            } catch (error) {
                console.error('Erro ao alterar status:', error);
            }
        });
    }

    setupNomeEditor(itemEl, item) {
        const nomeEl = itemEl.querySelector('.text-sm');
        nomeEl.addEventListener('blur', async () => {
            const novoNome = nomeEl.textContent.trim();
            if (novoNome && novoNome !== item.nome) {
                await this.itemActions.editarNome(item.id, item, novoNome);
                item.nome = novoNome;
            }
        });

        nomeEl.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                nomeEl.blur();
            }
        });
    }

    setupPrazoFunctions(itemEl, item) {
        const addPrazoBtn = itemEl.querySelector('.add-prazo-btn');
        
        // Adicionar prazo quando o botão for clicado
        addPrazoBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.togglePrazoEditor(itemEl, item);
        });
        
        // Editar prazo existente quando o badge for clicado
        const prazoBadge = itemEl.querySelector('.prazo-badge');
        if (prazoBadge) {
            prazoBadge.addEventListener('click', (e) => {
                e.stopPropagation();
                this.togglePrazoEditor(itemEl, item);
            });
        }
    }

    togglePrazoEditor(itemEl, item) {
        // Remove primeiro qualquer editor de descrição
        this.removeDescricaoEditor();
        
        // Verifica se já existe um editor de prazo
        const existingEditor = itemEl.querySelector('.prazo-editor-inline');
        if (existingEditor) {
            // Se existe, remove (toggle)
            existingEditor.remove();
            return;
        }
        
        // Remove qualquer outro editor aberto
        document.querySelectorAll('.prazo-editor-inline').forEach(el => el.remove());
        
        // Cria elemento de data inline
        const dateEditor = document.createElement('div');
        dateEditor.className = 'prazo-editor-inline flex items-center gap-1 ml-1';
        
        dateEditor.innerHTML = `
            <input type="date" class="text-xs px-2 py-1 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 w-32" 
                value="${item.data || ''}">
            <button class="save-prazo text-primary-500 hover:text-primary-600 p-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </button>
            <button class="cancel-prazo text-gray-400 hover:text-gray-500 p-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
            ${item.data ? `
            <button class="remove-prazo text-red-400 hover:text-red-500 p-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
            </button>
            ` : ''}
        `;
        
        // Insere no item
        const textContainer = itemEl.querySelector('.flex-1');
        textContainer.appendChild(dateEditor);
        
        // Setup botões
        const dateInputEl = dateEditor.querySelector('input');
        
        dateEditor.querySelector('.save-prazo').addEventListener('click', async () => {
            const novaData = dateInputEl.value;
            await this.salvarPrazo(itemEl, item, novaData);
            dateEditor.remove();
        });
        
        dateEditor.querySelector('.cancel-prazo').addEventListener('click', () => {
            dateEditor.remove();
        });
        
        if (item.data) {
            dateEditor.querySelector('.remove-prazo').addEventListener('click', async () => {
                await this.salvarPrazo(itemEl, item, null);
                dateEditor.remove();
            });
        }
        
        // Foca no input
        dateInputEl.focus();
        
        // Fecha quando pressionar Escape
        dateInputEl.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                dateEditor.remove();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                dateEditor.querySelector('.save-prazo').click();
            }
        });
    }
    
    async salvarPrazo(itemEl, item, novaData) {
        try {
            // Atualiza o item localmente e no servidor
            const itemAtualizado = {...item, data: novaData};
            await this.itemActions.editarPrazo(item.id, itemAtualizado);
            
            // Atualiza o item em memória
            item.data = novaData;
            
            // Atualiza o badge de prazo
            this.atualizarPrazoBadge(itemEl, item);
            
        } catch (error) {
            console.error('Erro ao salvar prazo:', error);
            this.board.utils.mostrarNotificacao('Erro ao salvar o prazo', 'error');
        }
    }
    
    atualizarPrazoBadge(itemEl, item) {
        // Remove badge existente se houver
        const badgeExistente = itemEl.querySelector('.prazo-badge');
        if (badgeExistente) {
            // Anima a remoção com slide-out
            badgeExistente.style.transition = 'opacity 200ms ease, transform 200ms ease';
            badgeExistente.style.opacity = '0';
            badgeExistente.style.transform = 'translateX(-10px)';
            
            setTimeout(() => {
                if (badgeExistente.parentNode) {
                    badgeExistente.parentNode.removeChild(badgeExistente);
                }
            }, 200);
        }
        
        const addPrazoBtn = itemEl.querySelector('.add-prazo-btn');
        const textContainer = itemEl.querySelector('.flex-1');
        
        if (item.data) {
            // Cria novo badge
            const badge = document.createElement('div');
            badge.className = `prazo-badge text-xs px-2 py-0.5 rounded-full cursor-pointer flex-shrink-0 transition-all hover:scale-105 ${this.getPrazoClass(item.data)}`;
            badge.innerHTML = this.formatarData(item.data);
            textContainer.insertBefore(badge, addPrazoBtn);
            
            // Anima a entrada com pop-in
            badge.style.opacity = '0';
            badge.style.transform = 'scale(0.8)';
            badge.style.transition = 'opacity 300ms ease, transform 300ms ease';
            
            // Força reflow para iniciar a animação
            badge.offsetHeight;
            
            badge.style.opacity = '1';
            badge.style.transform = 'scale(1)';
            
            // Esconde botão de adicionar prazo
            addPrazoBtn.classList.add('hidden');
            
            // Adiciona evento para editar prazo
            badge.addEventListener('click', (e) => {
                e.stopPropagation();
                this.togglePrazoEditor(itemEl, item);
                
                // Feedback visual ao clicar
                badge.classList.add('scale-110');
                setTimeout(() => {
                    badge.classList.remove('scale-110');
                }, 200);
            });
        } else {
            // Mostra botão de adicionar prazo
            addPrazoBtn.classList.remove('hidden');
        }
    }

    getPrazoClass(data) {
        if (!data) return '';
        
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        
        const prazoDate = new Date(data);
        prazoDate.setHours(0, 0, 0, 0);
        
        const diffDias = Math.floor((prazoDate - hoje) / (1000 * 60 * 60 * 24));
        
        if (diffDias < 0) {
            return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'; // Atrasado
        } else if (diffDias === 0) {
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'; // Hoje
        } else if (diffDias <= 2) {
            return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'; // Próximo
        } else {
            return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'; // Futuro
        }
    }

    getDiasRestantes(data) {
        if (!data) return '';
        
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        
        const prazoDate = new Date(data);
        prazoDate.setHours(0, 0, 0, 0);
        
        const diffDias = Math.floor((prazoDate - hoje) / (1000 * 60 * 60 * 24));
        
        if (diffDias < 0) {
            return diffDias === -1 ? 'Atrasado em 1 dia' : `Atrasado em ${Math.abs(diffDias)} dias`;
        } else if (diffDias === 0) {
            return 'Hoje';
        } else if (diffDias === 1) {
            return 'Amanhã';
        } else {
            return `Faltam ${diffDias} dias`;
        }
    }

    formatarData(dataStr) {
        if (!dataStr) return '';
        
        const data = new Date(dataStr);
        const dataFormatada = data.toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit'});
        
        return dataFormatada;
    }

    getPrazoTemplate(prazo) {
        const diasRestantes = this.getDiasRestantes(prazo);
        const dataFormatada = this.formatarData(prazo);
        
        return `
            <div class="prazo-badge flex items-center text-xs px-2 py-0.5 rounded-full cursor-pointer flex-shrink-0 transition-all hover:scale-105 hover:shadow-sm ${this.getPrazoClass(prazo)}">
                <span class="mr-1">${diasRestantes}</span>
                <span class="whitespace-nowrap">${dataFormatada}</span>
            </div>
        `;
    }

    setupDeleteButton(itemEl, item) {
        itemEl.querySelector('.delete-item').onclick = async (e) => {
            e.stopPropagation();
            if (confirm('Remover este item?')) {
                // Anima a saída com slide-out e fade
                itemEl.style.transition = 'opacity 300ms ease, transform 300ms ease, height 300ms ease, margin 300ms ease, padding 300ms ease';
                itemEl.style.opacity = '0';
                itemEl.style.transform = 'translateX(20px)';
                itemEl.style.height = '0';
                itemEl.style.marginTop = '0';
                itemEl.style.marginBottom = '0';
                itemEl.style.paddingTop = '0';
                itemEl.style.paddingBottom = '0';
                itemEl.style.overflow = 'hidden';
                
                // Espera a animação terminar
                setTimeout(async () => {
                    try {
                        await this.itemActions.deletar(item.id);
                        if (itemEl.parentNode) {
                            itemEl.parentNode.removeChild(itemEl);
                        }
                    } catch (error) {
                        // Se ocorrer erro, restaura o item
                        itemEl.style.opacity = '';
                        itemEl.style.transform = '';
                        itemEl.style.height = '';
                        itemEl.style.margin = '';
                        itemEl.style.padding = '';
                        itemEl.style.overflow = '';
                        itemEl.style.transition = '';
                        console.error('Erro ao deletar item:', error);
                    }
                }, 300);
            }
        };
    }

    getCheckmarkSvg() {
        return `<svg class="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
        </svg>`;
    }

    setupDescricaoFunctions(itemEl, item) {
        const addDescricaoBtn = itemEl.querySelector('.add-descricao-btn');
        
        // Adicionar descrição quando o botão for clicado
        if (addDescricaoBtn) {
            addDescricaoBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleDescricaoEditor(itemEl, item);
            });
        }
        
        // Editar descrição existente quando o ícone for clicado
        const descricaoIcon = itemEl.querySelector('.descricao-icon');
        if (descricaoIcon) {
            descricaoIcon.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleDescricaoEditor(itemEl, item);
            });
        }
    }

    toggleDescricaoEditor(itemEl, item) {
        // Remove primeiro qualquer editor de prazo
        this.removePrazoEditor();
        
        // Verifica se já existe um editor de descrição
        const existingEditor = itemEl.querySelector('.descricao-editor-inline');
        if (existingEditor) {
            // Se existe, remove (toggle)
            existingEditor.remove();
            return;
        }
        
        // Remove qualquer outro editor aberto
        document.querySelectorAll('.descricao-editor-inline').forEach(el => el.remove());
        
        // Cria elemento de descrição inline
        const descEditor = document.createElement('div');
        descEditor.className = 'descricao-editor-inline flex flex-col gap-1 my-1 w-full';
        
        descEditor.innerHTML = `
            <textarea class="text-xs px-2 py-1 h-24 w-full rounded border border-gray-300 dark:border-gray-600 
                dark:bg-gray-700 resize-none" placeholder="Adicione uma descrição...">${item.descricao || ''}</textarea>
            <div class="flex items-center justify-end gap-1">
                <button class="save-descricao text-primary-500 hover:text-primary-600 px-2 py-1 rounded text-xs">
                    Salvar
                </button>
                <button class="cancel-descricao text-gray-400 hover:text-gray-500 px-2 py-1 rounded text-xs">
                    Cancelar
                </button>
                ${item.descricao ? `
                <button class="remove-descricao text-red-400 hover:text-red-500 px-2 py-1 rounded text-xs">
                    Remover
                </button>
                ` : ''}
            </div>
        `;
        
        // Insere no item - cria uma nova linha e expande
        itemEl.classList.add('flex-wrap');
        const textContainer = itemEl.querySelector('.flex-1');
        
        // Cria div para o editor que ocupará toda a largura
        const editorContainer = document.createElement('div');
        editorContainer.className = 'w-full pl-7'; // pl-7 para alinhar com o texto
        editorContainer.appendChild(descEditor);
        
        // Adiciona após o container principal
        itemEl.appendChild(editorContainer);
        
        // Setup botões
        const textareaEl = descEditor.querySelector('textarea');
        
        descEditor.querySelector('.save-descricao').addEventListener('click', async () => {
            const novaDescricao = textareaEl.value.trim();
            await this.salvarDescricao(itemEl, item, novaDescricao === '' ? null : novaDescricao);
            editorContainer.remove();
            itemEl.classList.remove('flex-wrap');
        });
        
        descEditor.querySelector('.cancel-descricao').addEventListener('click', () => {
            editorContainer.remove();
            itemEl.classList.remove('flex-wrap');
        });
        
        if (item.descricao) {
            descEditor.querySelector('.remove-descricao').addEventListener('click', async () => {
                await this.salvarDescricao(itemEl, item, null);
                editorContainer.remove();
                itemEl.classList.remove('flex-wrap');
            });
        }
        
        // Foca no textarea
        textareaEl.focus();
        
        // Fecha quando pressionar Escape
        textareaEl.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                editorContainer.remove();
                itemEl.classList.remove('flex-wrap');
            }
        });
    }
    
    async salvarDescricao(itemEl, item, novaDescricao) {
        try {
            // Atualiza o item localmente e no servidor
            const itemAtualizado = {...item, descricao: novaDescricao};
            await this.itemActions.editarDescricao(item.id, itemAtualizado);
            
            // Atualiza o item em memória
            item.descricao = novaDescricao;
            
            // Atualiza o ícone de descrição
            this.atualizarDescricaoIcon(itemEl, item);
            
        } catch (error) {
            console.error('Erro ao salvar descrição:', error);
            this.board.utils.mostrarNotificacao('Erro ao salvar a descrição', 'error');
        }
    }
    
    atualizarDescricaoIcon(itemEl, item) {
        // Remove ícone existente se houver
        const iconExistente = itemEl.querySelector('.descricao-icon');
        if (iconExistente) {
            // Anima a remoção com fade-out
            iconExistente.style.transition = 'opacity 200ms ease, transform 200ms ease';
            iconExistente.style.opacity = '0';
            iconExistente.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                if (iconExistente.parentNode) {
                    iconExistente.parentNode.removeChild(iconExistente);
                }
            }, 200);
        }
        
        const addDescricaoBtn = itemEl.querySelector('.add-descricao-btn');
        const textContainer = itemEl.querySelector('.flex-1');
        
        if (item.descricao) {
            // Cria novo ícone
            const icon = document.createElement('div');
            icon.className = 'descricao-icon cursor-pointer flex-shrink-0 relative group transition-all hover:scale-110';
            icon.innerHTML = `
                <svg class="w-5 h-5 text-primary-400 hover:text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                </svg>
                <div class="tooltip opacity-0 invisible group-hover:opacity-100 group-hover:visible transform scale-95 group-hover:scale-100 transition-all duration-200 absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-xs bg-gray-800 text-white rounded-lg shadow-lg z-10 w-48 max-w-xs">
                    <div class="max-h-32 overflow-y-auto">
                        ${this.formatDescricaoForTooltip(item.descricao)}
                    </div>
                    <div class="tooltip-arrow absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                </div>
            `;
            
            // Insere antes do botão de adicionar prazo
            const referenceNode = itemEl.querySelector('.add-prazo-btn') || textContainer.lastChild;
            textContainer.insertBefore(icon, referenceNode);
            
            // Anima a entrada com pop-in
            icon.style.opacity = '0';
            icon.style.transform = 'scale(0.8)';
            icon.style.transition = 'opacity 300ms ease, transform 300ms ease';
            
            // Força reflow para iniciar a animação
            icon.offsetHeight;
            
            icon.style.opacity = '1';
            icon.style.transform = 'scale(1)';
            
            // Esconde botão de adicionar descrição
            addDescricaoBtn.classList.add('hidden');
            
            // Adiciona evento para editar descrição
            icon.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleDescricaoEditor(itemEl, item);
                
                // Feedback visual ao clicar
                icon.querySelector('svg').classList.add('scale-125');
                setTimeout(() => {
                    icon.querySelector('svg').classList.remove('scale-125');
                }, 200);
            });
        } else {
            // Mostra botão de adicionar descrição
            addDescricaoBtn.classList.remove('hidden');
        }
    }

    getDescricaoTemplate(descricao) {
        return `
            <div class="descricao-icon cursor-pointer flex-shrink-0 relative group transition-all hover:scale-110">
                <svg class="w-5 h-5 text-primary-400 hover:text-primary-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                </svg>
                <div class="tooltip opacity-0 invisible group-hover:opacity-100 group-hover:visible transform scale-95 group-hover:scale-100 transition-all duration-200 absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-xs bg-gray-800 text-white rounded-lg shadow-lg z-10 w-48 max-w-xs">
                    <div class="max-h-32 overflow-y-auto">
                        ${this.formatDescricaoForTooltip(descricao)}
                    </div>
                    <div class="tooltip-arrow absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                </div>
            </div>
        `;
    }
    
    formatDescricaoForTooltip(descricao) {
        if (!descricao) return '';
        // Substituir quebras de linha por <br>
        return descricao.replace(/\n/g, '<br>');
    }

    truncateDescricao(descricao) {
        if (!descricao) return '';
        return descricao.length > 100 ? descricao.substring(0, 97) + '...' : descricao;
    }
    
    removeDescricaoEditor() {
        const editor = document.querySelector('.descricao-editor-inline');
        if (editor) {
            const itemEl = editor.closest('.checklist-item');
            const editorContainer = editor.closest('.w-full');
            if (editorContainer) editorContainer.remove();
            if (itemEl) itemEl.classList.remove('flex-wrap');
        }
    }
    
    removePrazoEditor() {
        document.querySelectorAll('.prazo-editor-inline').forEach(el => el.remove());
    }

    setupDestaqueButton(itemEl, item) {
        const destaqueBtn = itemEl.querySelector('.toggle-destaque');
        if (destaqueBtn) {
            destaqueBtn.addEventListener('click', async (e) => {
                e.stopPropagation();
                try {
                    const novoDestaque = !item.destaque;
                    await this.toggleDestaque(item, novoDestaque);
                    
                    // Atualiza visual do botão com animação
                    if (novoDestaque) {
                        // Aplicar animação ao adicionar destaque
                        destaqueBtn.classList.add('animate-pulse');
                        setTimeout(() => {
                            destaqueBtn.classList.remove('animate-pulse');
                            destaqueBtn.classList.add('text-yellow-500', 'bg-yellow-50', 'dark:bg-yellow-900/20');
                            destaqueBtn.classList.remove('text-gray-400');
                        }, 300);
                    } else {
                        // Animação ao remover destaque
                        destaqueBtn.classList.add('animate-spin');
                        setTimeout(() => {
                            destaqueBtn.classList.remove('animate-spin');
                            destaqueBtn.classList.remove('text-yellow-500', 'bg-yellow-50', 'dark:bg-yellow-900/20');
                            destaqueBtn.classList.add('text-gray-400');
                        }, 300);
                    }
                    
                    // Atualiza o ícone
                    const svg = destaqueBtn.querySelector('svg');
                    if (svg) {
                        svg.setAttribute('fill', novoDestaque ? 'currentColor' : 'none');
                    }
                    
                    // Se destacado, coloca em destaque também visualmente o item inteiro
                    if (novoDestaque) {
                        // Adiciona com animação
                        itemEl.style.transition = 'background-color 0.3s ease, border 0.3s ease, transform 0.3s ease';
                        itemEl.style.transform = 'translateX(5px)';
                        
                        setTimeout(() => {
                            itemEl.classList.add('bg-yellow-50/50', 'dark:bg-yellow-900/10', 'border-l-2', 'border-yellow-400');
                            itemEl.style.transform = 'translateX(0)';
                            
                            setTimeout(() => {
                                itemEl.style.transition = '';
                            }, 300);
                        }, 50);
                    } else {
                        // Remove classes com animação suave
                        itemEl.style.transition = 'background-color 0.3s ease, border 0.3s ease, transform 0.3s ease';
                        itemEl.style.transform = 'translateX(-5px)';
                        
                        setTimeout(() => {
                            itemEl.classList.remove('bg-yellow-50/50', 'dark:bg-yellow-900/10', 'border-l-2', 'border-yellow-400');
                            itemEl.style.transform = 'translateX(0)';
                            
                            setTimeout(() => {
                                itemEl.style.transition = '';
                            }, 300);
                        }, 50);
                    }
                    
                } catch (error) {
                    console.error('Erro ao alternar destaque:', error);
                    this.board.utils.mostrarNotificacao('Erro ao destacar item', 'error');
                }
            });
        }
    }
    
    async toggleDestaque(item, novoDestaque) {
        // Atualiza o item localmente e no servidor
        const itemAtualizado = {...item, destaque: novoDestaque};
        await this.itemActions.editarDestaque(item.id, itemAtualizado);
        
        // Atualiza o item em memória
        item.destaque = novoDestaque;
    }
}
