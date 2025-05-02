export class KanbanUtils {
    traduzirPrioridade(prioridade) {
        const traducoes = {
            'baixa': 'Baixa',
            'media': 'Média',
            'alta': 'Alta'
        };
        return traducoes[prioridade.toLowerCase()] || prioridade;
    }

    formatarData(data) {
        return new Date(data).toLocaleDateString('pt-BR');
    }

    mostrarNotificacao(mensagem, tipo = 'info') {
        appService.notificacao(mensagem, tipo);
    }
}
