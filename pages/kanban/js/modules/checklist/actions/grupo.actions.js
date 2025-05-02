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
            await this.kanbanService.deletarGrupoChecklist(grupoId);
        } catch (error) {
            this.board.utils.mostrarNotificacao('Erro ao deletar grupo', 'error');
            throw error;
        }
    }
}
