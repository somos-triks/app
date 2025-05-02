class KanbanBoard {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.sortables = [];
        this.initializeSortable();
    }

    initializeSortable() {
        const listas = this.container.querySelectorAll('.kanban-lista');
        this.sortables = Array.from(listas).map(lista => {
            return Sortable.create(lista.querySelector('.cards-container'), {
                group: 'cards',
                animation: 150,
                ghostClass: 'card-ghost',
                onEnd: async (evt) => {
                    const cardId = evt.item.dataset.cardId;
                    const novaListaId = evt.to.closest('.kanban-lista').dataset.listaId;
                    const cards = evt.to.querySelectorAll('.kanban-card');
                    const novaOrdem = Array.from(cards).indexOf(evt.item) + 1;

                    try {
                        await kanbanService.atualizarPosicaoCard(cardId, novaListaId, novaOrdem);
                    } catch (error) {
                        console.error('Erro ao atualizar posição:', error);
                        // Reverte a posição em caso de erro
                        evt.from.insertBefore(evt.item, evt.oldIndex);
                    }
                }
            });
        });
    }

    async adicionarLista(titulo, cor) {
        try {
            const dados = {
                kanban_id: this.kanbanId,
                titulo,
                cor,
                ordem: this.container.querySelectorAll('.kanban-lista').length + 1
            };
            const response = await kanbanService.criarLista(dados);
            this.renderizarLista(response.data);
        } catch (error) {
            console.error('Erro ao adicionar lista:', error);
        }
    }

    async adicionarCard(listaId, titulo, descricao, prazo, prioridade) {
        try {
            const dados = {
                lista_id: listaId,
                titulo,
                descricao,
                prazo,
                prioridade,
                ordem: document.querySelector(`[data-lista-id="${listaId}"] .kanban-card`).length + 1
            };
            const response = await kanbanService.criarCard(dados);
            this.renderizarCard(listaId, response.data);
        } catch (error) {
            console.error('Erro ao adicionar card:', error);
        }
    }

    renderizarLista(lista) {
        const listaHTML = `
            <div class="kanban-lista" data-lista-id="${lista.id}" style="border-top: 3px solid ${lista.cor}">
                <div class="lista-header">
                    <h3>${lista.titulo}</h3>
                    <button class="add-card-btn">+ Add Card</button>
                </div>
                <div class="cards-container"></div>
            </div>
        `;
        this.container.insertAdjacentHTML('beforeend', listaHTML);
        this.initializeSortable();
    }

    renderizarCard(listaId, card) {
        const cardHTML = `
            <div class="kanban-card" data-card-id="${card.id}">
                <h4>${card.titulo}</h4>
                <p>${card.descricao}</p>
                <div class="card-footer">
                    <span class="prazo">${card.prazo}</span>
                    <span class="prioridade ${card.prioridade}">${card.prioridade}</span>
                </div>
            </div>
        `;
        const lista = this.container.querySelector(`[data-lista-id="${listaId}"] .cards-container`);
        lista.insertAdjacentHTML('beforeend', cardHTML);
    }
}
