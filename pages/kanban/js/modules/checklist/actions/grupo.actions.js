export class GrupoActions {
    constructor(board, kanbanService) {
        this.board = board;
        this.kanbanService = kanbanService;
    }

    async editarNome(grupoId, novoNome) {
        try {
            await this.kanbanService.editarGrupoChecklist(grupoId, { nome: novoNome });
        } catch (error) {
            this.board.utils.mostrarNotificacao('Erro ao editar grupo', 'error');
            throw error;
        }
    }

    async deletar(grupoId) {
        try {
            const response = await this.kanbanService.deletarGrupoChecklist(grupoId);
            if (!response || !response.success) {
                throw new Error(response?.message || 'Erro ao deletar grupo');
            }
            return response;
        } catch (error) {
            this.board.utils.mostrarNotificacao(error.message || 'Erro ao deletar grupo', 'error');
            throw error;
        }
    }
}
