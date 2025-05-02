import { KanbanTemplates } from './kanban.templates.js';
import { KanbanEvents } from './kanban.events.js';
import { KanbanRenderer } from './kanban.renderer.js';
import { KanbanUtils } from './kanban.utils.js';
import { KanbanListManager } from './list/kanban.list.manager.js';
import { KanbanCardManager } from './card/kanban.card.manager.js';
import { KanbanCardModal } from './card-modal/kanban.card.modal.js';  
import { KanbanChecklistManager } from './checklist/kanban.checklist.manager.js';  

export class KanbanBoard {
    constructor() {
        this.kanbanId = null;
        this.sortableInstances = [];
        
        // Inicializar templates primeiro
        this.templates = new KanbanTemplates();
        this.templates.loadTemplates();
        this.renderer = new KanbanRenderer(this);
        this.events = new KanbanEvents(this);
        this.utils = new KanbanUtils();
        this.listManager = new KanbanListManager(this);
        this.cardManager = new KanbanCardManager(this);
        this.cardModal = new KanbanCardModal(this);
        this.checklistManager = new KanbanChecklistManager(this);
    }

    async init() {
        try {
            this.initBindings();
            this.events.initializeEventListeners();
            
            if (window.clienteService?.selectedClient) {
                await appService.atualizarListaKanbans();
            }
        } catch (error) {
            console.error('[KanbanBoard.init] Erro detalhado:', error);
        }
    }

    popularSelectKanbans(kanbans) {
        const select = document.getElementById('kanban-select');
        select.innerHTML = '<option value="">Selecione um kanban</option>';
        kanbans.forEach(kanban => {
            select.insertAdjacentHTML('beforeend', `
                <option value="${kanban.id}">${kanban.titulo}</option>
            `);
        });
    }

    async renderKanbanBoard(kanbanId) {
        try {
            const response = await kanbanService.getKanbanCompleto(kanbanId);

            if (!response.success) {
                throw new Error(response.message || 'Erro ao carregar kanban');
            }
            
            const kanbanBoard = document.getElementById('kanbanBoard');
            const kanbanListsContainer = document.getElementById('kanbanListsContainer');
            kanbanListsContainer.innerHTML = '';
            kanbanBoard.classList.remove('hidden');

            const listas = response.data.listas || [];

            // Renderiza todas as listas
            listas
                .sort((a, b) => a.ordem - b.ordem)
                .forEach(lista => {
                    const listaElement = this.renderer.renderizarLista(lista);
                    const cards = lista.cards || [];
                    cards
                        .sort((a, b) => a.ordem - b.ordem)
                        .forEach(card => {
                            this.renderer.renderizarCard(lista.id, card);
                        });
                });

            // Adiciona o botão no final
            const addListButton = this.renderer.createAddListButton();
            kanbanListsContainer.appendChild(addListButton);

            this.initializeSortable();
        } catch (error) {
            console.error('Erro detalhado ao renderizar kanban:', error);
            throw error;
        }
    }

    initBindings() {
        Object.getOwnPropertyNames(Object.getPrototypeOf(this))
            .filter(method => typeof this[method] === 'function')
            .forEach(method => {
                this[method] = this[method].bind(this);
            });
    }

    initializeSortable() {
        const containers = document.querySelectorAll('.cards-container');
        this.sortableInstances = Array.from(containers).map(container => {
            return Sortable.create(container, {
                group: 'cards',
                animation: 150,
                ghostClass: 'card-ghost',
                dragClass: 'card-drag',
                // Impedir que o drag seja iniciado em elementos dentro do modal
                filter: '.modal-content',
                onEnd: async (evt) => {
                    try {
                        const cardId = evt.item.dataset.cardId;
                        const novaListaId = evt.to.closest('.kanban-lista').dataset.listaId;
                        const antigaListaId = evt.from.closest('.kanban-lista').dataset.listaId;
                        const novaOrdem = Array.from(evt.to.children).indexOf(evt.item) + 1;
                        const antigaOrdem = evt.oldIndex + 1;

                        // Só atualiza se houve mudança real na posição ou lista
                        if (novaListaId !== antigaListaId || novaOrdem !== antigaOrdem) {
                            await kanbanService.atualizarPosicaoCard(cardId, novaListaId, novaOrdem);
                        } else {
                            // Se não houve mudança, força o card voltar para posição original
                            const cards = Array.from(evt.from.children);
                            cards.splice(evt.oldIndex, 0, cards.splice(evt.newIndex, 1)[0]);
                        }
                    } catch (error) {
                        console.error('Erro ao atualizar posição:', error);
                        this.utils.mostrarNotificacao('Erro ao atualizar posição', 'error');
                        evt.from.insertBefore(evt.item, evt.oldIndex);
                    }
                }
            });
        });
    }
}
