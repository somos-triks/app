export class ItemActions {
    constructor(board, kanbanService) {
        this.board = board;
        this.kanbanService = kanbanService;
    }

    async toggleMarcacao(item) {
        try {
            const novoStatus = !item.marcacao;
            await this.kanbanService.editarItemChecklist(item.id, {
                ...item,
                marcacao: novoStatus
            });
            return novoStatus;
        } catch (error) {
            this.board.utils.mostrarNotificacao('Erro ao atualizar status', 'error');
            throw error;
        }
    }

    async editarNome(itemId, item, novoNome) {
        try {
            await this.kanbanService.editarItemChecklist(itemId, {
                ...item,
                nome: novoNome
            });
        } catch (error) {
            this.board.utils.mostrarNotificacao('Erro ao editar item', 'error');
            throw error;
        }
    }

    async deletar(itemId) {
        try {
            await this.kanbanService.deletarItemChecklist(itemId);
        } catch (error) {
            this.board.utils.mostrarNotificacao('Erro ao deletar item', 'error');
            throw error;
        }
    }

    async criar(dados) {
        try {
            return await this.kanbanService.criarItemChecklist(dados);
        } catch (error) {
            this.board.utils.mostrarNotificacao('Erro ao criar item', 'error');
            throw error;
        }
    }
}
