export class KanbanListManager {
    constructor(board) {
        this.board = board;
        this.colors = [
            '#3B82F6', // blue
            '#10B981', // green
            '#F59E0B', // yellow
            '#EF4444', // red
            '#8B5CF6', // purple
            '#EC4899', // pink
            '#06B6D4', // cyan
            '#F97316', // orange
            '#6366F1', // indigo
        ];
    }

    getRandomColor() {
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    async criarNovaLista() {
        try {
            const container = document.getElementById('kanbanListsContainer');
            this.board.renderer.removeAddListButton();

            const novaListaEl = document.createElement('div');
            novaListaEl.className = 'kanban-lista flex-shrink-0 w-80 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm';
            novaListaEl.innerHTML = `
                <div class="p-4 space-y-4">
                    <div class="space-y-1.5">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Nome da Lista
                        </label>
                        <input type="text" 
                            class="w-full px-3 py-2 rounded-md border border-gray-300 bg-white dark:bg-gray-700 
                            dark:border-gray-600 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 
                            focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500
                            placeholder-gray-400 dark:placeholder-gray-500" 
                            placeholder="Digite o nome da lista">
                    </div>
                    
                    <div class="space-y-1.5">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Cor da Lista
                        </label>
                        <div class="flex items-center gap-3">
                            <input type="color" 
                                class="h-9 w-16 rounded border border-gray-300 dark:border-gray-600 bg-white 
                                dark:bg-gray-700 cursor-pointer" 
                                value="${this.getRandomColor()}">
                            <div class="flex-1 text-xs text-gray-500 dark:text-gray-400">
                                Cor aleatória selecionada
                            </div>
                        </div>
                    </div>

                    <div class="pt-2 flex items-center justify-end gap-2 border-t border-gray-200 dark:border-gray-700">
                        <button class="cancelar-lista px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                            hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
                            Cancelar
                        </button>
                        <button class="salvar-lista px-4 py-2 text-sm font-medium text-white bg-primary-500 
                            hover:bg-primary-600 rounded-md transition-colors shadow-sm flex items-center gap-2">
                            <span>Salvar Lista</span>
                            <svg class="w-4 h-4 save-icon hidden animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            `;

            container.appendChild(novaListaEl);
            this.setupListaEventListeners(novaListaEl);
            this.board.renderer.ensureAddListButton();
            
            novaListaEl.querySelector('input[type="text"]').focus();
        } catch (error) {
            console.error('Erro ao criar nova lista:', error);
            throw error;
        }
    }

    setupListaEventListeners(novaListaEl) {
        const cancelarBtn = novaListaEl.querySelector('.cancelar-lista');
        const salvarBtn = novaListaEl.querySelector('.salvar-lista');
        const saveIcon = salvarBtn.querySelector('.save-icon');

        cancelarBtn.addEventListener('click', () => {
            novaListaEl.remove();
            this.board.renderer.ensureAddListButton();
        });

        salvarBtn.addEventListener('click', async () => {
            const titulo = novaListaEl.querySelector('input[type="text"]').value;
            const cor = novaListaEl.querySelector('input[type="color"]').value;

            if (!titulo.trim()) {
                this.board.utils.mostrarNotificacao('Digite um título para a lista', 'error');
                return;
            }

            try {
                // Show loading state
                salvarBtn.disabled = true;
                saveIcon.classList.remove('hidden');

                const dados = {
                    kanban_id: this.board.kanbanId,
                    titulo,
                    cor,
                    ordem: document.querySelectorAll('.kanban-lista').length
                };

                const response = await kanbanService.criarLista(dados);
                if (response.success) {
                    novaListaEl.remove();
                    this.board.renderer.renderizarLista(response.data);
                    this.board.renderer.ensureAddListButton();
                    this.board.initializeSortable();
                }
            } catch (error) {
                this.board.utils.mostrarNotificacao('Erro ao criar lista', 'error');
            } finally {
                // Hide loading state
                salvarBtn.disabled = false;
                saveIcon.classList.add('hidden');
            }
        });
    }
}
