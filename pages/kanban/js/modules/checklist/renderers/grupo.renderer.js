import { ChecklistAnimations } from '../animations.js';

export class GrupoRenderer {
    constructor(board, grupoActions) {
        this.board = board;
        this.grupoActions = grupoActions;
    }

    render(grupo) {
        const container = document.getElementById('checklistGroups');
        const grupoEl = document.createElement('div');
        grupoEl.className = 'checklist-group space-y-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg opacity-0 transform -translate-y-4 transition-all duration-300';
        grupoEl.dataset.grupoId = grupo.id;
        
        grupoEl.innerHTML = `
            <div class="flex items-center gap-2 group">
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-200 flex-1 cursor-pointer hover:text-primary-500 transition-colors duration-200" 
                    contenteditable="true">${grupo.nome}</h4>
                <button class="add-checklist-item p-1.5 text-gray-400 hover:text-primary-500 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-all duration-200 transform hover:scale-110">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                </button>
                <button class="delete-grupo text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200 transform hover:scale-110">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
            <div class="items-container space-y-2"></div>
        `;

        this.setupEventListeners(grupoEl, grupo);
        container.appendChild(grupoEl);
        
        // Anima entrada com Tailwind depois de adicionado ao DOM
        setTimeout(() => {
            grupoEl.classList.remove('opacity-0', '-translate-y-4');
            grupoEl.classList.add('opacity-100', 'translate-y-0');
        }, 50);
        
        return grupoEl;
    }

    setupEventListeners(grupoEl, grupo) {
        const titulo = grupoEl.querySelector('h4');
        
        titulo.addEventListener('blur', async () => {
            const novoNome = titulo.textContent.trim();
            if (novoNome && novoNome !== grupo.nome) {
                await this.grupoActions.editarNome(grupo.id, novoNome);
            }
        });

        titulo.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                titulo.blur();
            }
        });

        grupoEl.querySelector('.delete-grupo').onclick = async () => {
            if (confirm('Remover este grupo?')) {
                try {
                    // Anima a saída com Tailwind
                    grupoEl.classList.add('transition-all', 'duration-300');
                    grupoEl.classList.add('opacity-0', 'translate-y-4');
                    
                    // Aguarda a animação antes de tentar excluir
                    setTimeout(async () => {
                        try {
                            await this.grupoActions.deletar(grupo.id);
                            if (grupoEl.parentNode) {
                                grupoEl.parentNode.removeChild(grupoEl);
                            }
                        } catch (error) {
                            // Restaura a visibilidade se houver erro
                            grupoEl.classList.remove('opacity-0', 'translate-y-4');
                            grupoEl.classList.add('opacity-100', 'translate-y-0');
                            console.error('Erro ao deletar grupo:', error);
                            this.board.utils.mostrarNotificacao('Erro ao deletar grupo', 'error');
                        }
                    }, 300);
                    
                } catch (error) {
                    console.error('Erro ao deletar grupo:', error);
                    this.board.utils.mostrarNotificacao('Erro ao deletar grupo', 'error');
                }
            }
        };

        // Botão adicionar item
        const addItemBtn = grupoEl.querySelector('.add-checklist-item');
        if (addItemBtn) {
            addItemBtn.addEventListener('click', () => {
                const itemsContainer = grupoEl.querySelector('.items-container');
                this.renderNovoItemForm(itemsContainer, grupo);
            });
        }
    }

    renderNovoItemForm(container, grupo) {
        // Verifica se já existe um formulário aberto e remove
        const formExistente = container.querySelector('.new-item-form');
        if (formExistente) formExistente.remove();
        
        const formEl = document.createElement('div');
        formEl.className = 'new-item-form bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm opacity-0 transform scale-95 transition-all duration-300';
        
        formEl.innerHTML = `
            <div class="space-y-3">
                <div class="flex items-center gap-2">
                    <input type="text" 
                        class="flex-1 px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 
                        dark:bg-gray-600 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
                        placeholder="Nome do item">
                    <input type="date" 
                        class="px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 
                        dark:bg-gray-600 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                </div>
                <textarea 
                    class="w-full px-3 py-2 text-sm h-20 rounded-md border border-gray-300 dark:border-gray-600 
                    dark:bg-gray-600 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none" 
                    placeholder="Descrição (opcional)"></textarea>
                <div class="flex items-center justify-between">
                    <label class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <input type="checkbox" class="rounded border-gray-300 text-primary-500 focus:ring-primary-500">
                        <span class="flex items-center gap-1">
                            Destacar 
                            <svg class="w-4 h-4 text-yellow-500" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                        </span>
                    </label>
                    <div class="flex justify-end gap-2">
                        <button class="cancel-checklist-item px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 
                            hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md">
                            Cancelar
                        </button>
                        <button class="save-checklist-item px-3 py-1.5 text-sm text-white bg-primary-500 
                            hover:bg-primary-600 rounded-md flex items-center gap-2">
                            <span>Adicionar</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Adiciona formulário com animação
        container.appendChild(formEl);
        
        // Anima entrada com Tailwind
        setTimeout(() => {
            formEl.classList.remove('opacity-0', 'scale-95');
            formEl.classList.add('opacity-100', 'scale-100');
        }, 50);
        
        // Foca no campo de nome automaticamente
        formEl.querySelector('input[type="text"]').focus();
        
        // Botão cancelar
        formEl.querySelector('.cancel-checklist-item').addEventListener('click', () => {
            formEl.remove();
        });

        // Botão salvar
        formEl.querySelector('.save-checklist-item').addEventListener('click', async () => {
            const nome = formEl.querySelector('input[type="text"]').value.trim();
            const data = formEl.querySelector('input[type="date"]').value;
            const descricao = formEl.querySelector('textarea').value.trim();
            const destaque = formEl.querySelector('input[type="checkbox"]').checked;
            
            if (!nome) {
                this.board.utils.mostrarNotificacao('Digite um nome para o item', 'error');
                return;
            }

            try {
                const dados = {
                    grupo_id: grupo.id,
                    nome: nome,
                    data: data || null,
                    descricao: descricao || null,
                    destaque: destaque,
                    card_id: this.board.checklistManager.currentCardId
                };

                const response = await kanbanService.criarItemChecklist(dados);
                if (response.success) {
                    // Anima a saída do formulário
                    formEl.classList.add('transition-all', 'duration-300');
                    formEl.classList.add('opacity-0', 'scale-95');
                    
                    setTimeout(() => {
                        formEl.remove();
                        
                        // Renderiza o novo item com animação
                        const novoItem = this.board.checklistManager.itemRenderer.render(container, response.data);
                    }, 300);
                }
            } catch (error) {
                this.board.utils.mostrarNotificacao('Erro ao criar item', 'error');
            }
        });
    }
}
