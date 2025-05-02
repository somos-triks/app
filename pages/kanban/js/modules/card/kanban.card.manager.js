export class KanbanCardManager {
    constructor(board) {
        this.board = board;
    }

    async iniciarCriacaoCard(listaId) {
        const container = document.querySelector(`[data-lista-id="${listaId}"] .cards-container`);
        const novoCardEl = document.createElement('div');
        novoCardEl.className = 'kanban-card bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm border-2 border-primary-500/50 dark:border-primary-500/50';
        novoCardEl.innerHTML = `
            <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                    <input type="text" 
                        class="flex-1 px-3 py-2 text-sm rounded-md border dark:bg-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500" 
                        placeholder="Digite o título do card"
                        autofocus>
                    <button class="cancelar-card p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <button class="criar-card w-full px-3 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-md transition-colors flex items-center justify-center gap-2">
                    <span>Criar Card</span>
                    <svg class="w-4 h-4 loading-icon hidden animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </button>
            </div>
        `;

        container.insertBefore(novoCardEl, container.firstChild);
        const input = novoCardEl.querySelector('input');
        const loadingIcon = novoCardEl.querySelector('.loading-icon');
        const criarBtn = novoCardEl.querySelector('.criar-card');
        
        // Setup event listeners
        input.addEventListener('keypress', async (e) => {
            if (e.key === 'Enter' && input.value.trim()) {
                await this.salvarCard(listaId, input.value.trim(), novoCardEl, loadingIcon);
            }
        });

        criarBtn.addEventListener('click', async () => {
            if (input.value.trim()) {
                await this.salvarCard(listaId, input.value.trim(), novoCardEl, loadingIcon);
            }
        });

        novoCardEl.querySelector('.cancelar-card').addEventListener('click', () => {
            novoCardEl.remove();
        });

        input.focus();
    }

    async salvarCard(listaId, titulo, novoCardEl, loadingIcon) {
        try {
            loadingIcon.classList.remove('hidden');
            const btnText = novoCardEl.querySelector('.criar-card span');
            btnText.textContent = 'Criando...';
            novoCardEl.querySelector('input').disabled = true;
            novoCardEl.querySelector('.criar-card').disabled = true;

            const dados = {
                lista_id: listaId,
                titulo,
                ordem: 1 // Sempre adiciona no topo
            };

            const response = await kanbanService.criarCard(dados);
            if (response.success) {
                novoCardEl.remove();
                const newCard = this.board.renderer.renderizarCard(listaId, response.data);
                newCard.classList.add('animate-fadeIn');
            }
        } catch (error) {
            this.board.utils.mostrarNotificacao('Erro ao criar card', 'error');
        }
    }
}
