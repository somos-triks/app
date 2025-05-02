export class GrupoRenderer {
    constructor(board, grupoActions) {
        this.board = board;
        this.grupoActions = grupoActions;
    }

    render(grupo) {
        const container = document.getElementById('checklistGroups');
        const grupoEl = document.createElement('div');
        grupoEl.className = 'checklist-group space-y-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg';
        grupoEl.dataset.grupoId = grupo.id;
        
        grupoEl.innerHTML = `
            <div class="flex items-center gap-2 group">
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-200 flex-1 cursor-pointer hover:text-primary-500" 
                    contenteditable="true">${grupo.nome}</h4>
                <button class="add-checklist-item p-1.5 text-gray-400 hover:text-primary-500 hover:bg-gray-100 dark:hover:bg-gray-600 rounded">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                </button>
                <button class="delete-grupo text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
            <div class="items-container space-y-2"></div>
        `;

        this.setupEventListeners(grupoEl, grupo);
        container.appendChild(grupoEl);
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
                await this.grupoActions.deletar(grupo.id);
                grupoEl.remove();
            }
        };

        // Botão adicionar item
        const addItemBtn = grupoEl.querySelector('.add-checklist-item');
        if (addItemBtn) {
            addItemBtn.addEventListener('click', () => {
                const template = document.getElementById('newChecklistItemTemplate');
                const clone = template.content.cloneNode(true);
                const itemsContainer = grupoEl.querySelector('.items-container');
                itemsContainer.appendChild(clone);

                // Setup dos botões do novo item
                const newItemEl = itemsContainer.lastElementChild;
                
                // Botão cancelar
                newItemEl.querySelector('.cancel-checklist-item').addEventListener('click', () => {
                    newItemEl.remove();
                });

                // Botão salvar
                newItemEl.querySelector('.save-checklist-item').addEventListener('click', async () => {
                    const nome = newItemEl.querySelector('input[type="text"]').value.trim();
                    if (!nome) {
                        this.board.utils.mostrarNotificacao('Digite um nome para o item', 'error');
                        return;
                    }

                    try {
                        const dados = {
                            grupo_id: grupo.id,
                            nome: nome,
                            card_id: this.board.checklistManager.currentCardId // Adicionando card_id
                        };

                        const response = await kanbanService.criarItemChecklist(dados);
                        if (response.success) {
                            newItemEl.remove();
                            this.board.itemRenderer.render(itemsContainer, response.data);
                        }
                    } catch (error) {
                        this.board.utils.mostrarNotificacao('Erro ao criar item', 'error');
                    }
                });
            });
        }
    }
}
