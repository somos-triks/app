export class KanbanEvents {
    constructor(board) {
        this.board = board;
    }

    initializeEventListeners() {
        const clienteSelect = document.getElementById('cliente-select');
        const kanbanSelect = document.getElementById('kanban-select');
        const addListBtn = document.getElementById('addListBtn');

        if (clienteSelect) clienteSelect.addEventListener('change', this.handleClienteChange.bind(this));
        if (kanbanSelect) kanbanSelect.addEventListener('change', this.handleKanbanChange.bind(this));
        if (addListBtn) addListBtn.addEventListener('click', this.criarNovaLista.bind(this));
    }

    async handleClienteChange(event) {
        const clienteId = event.target.value;
        if (!clienteId) return;

        try {
            const response = await kanbanService.listarKanbansPorCliente(clienteId);
            this.board.popularSelectKanbans(response.data);
        } catch (error) {
            this.board.utils.mostrarNotificacao('Erro ao carregar kanbans', 'error');
        }
    }

    async handleKanbanChange(event) {
        const kanbanId = event.target.value;
        if (!kanbanId) return;

        this.board.kanbanId = kanbanId;
        try {
            await this.board.renderKanbanBoard(kanbanId);
        } catch (error) {
            this.board.utils.mostrarNotificacao('Erro ao carregar kanban', 'error');
        }
    }

    async criarNovaLista() {
        await this.board.listManager.criarNovaLista();
    }
}
