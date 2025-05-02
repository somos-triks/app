import { GrupoActions } from './actions/grupo.actions.js';
import { ItemActions } from './actions/item.actions.js';
import { GrupoRenderer } from './renderers/grupo.renderer.js';
import { ItemRenderer } from './renderers/item.renderer.js';

export class KanbanChecklistManager {
    constructor(board) {
        this.board = board;
        this.currentCardId = null;
        
        // Inicializar actions
        this.grupoActions = new GrupoActions(board, kanbanService);
        this.itemActions = new ItemActions(board, kanbanService);
        
        // Inicializar renderers
        this.grupoRenderer = new GrupoRenderer(board, this.grupoActions);
        this.itemRenderer = new ItemRenderer(board, this.itemActions);
    }

    setCurrentCard(cardId) {
        this.currentCardId = cardId;
    }

    limparChecklists() {
        const container = document.getElementById('checklistGroups');
        container.innerHTML = '';
    }

    async carregarChecklists(cardData) {
        try {
            this.limparChecklists();
            this.currentCardId = cardData.id;
            
            if (cardData?.checklist) {
                cardData.checklist.forEach(grupo => {
                    const grupoEl = this.grupoRenderer.render(grupo);
                    const itemsContainer = grupoEl.querySelector('.items-container');
                    if (itemsContainer && grupo.itens) {
                        grupo.itens.forEach(item => {
                            this.itemRenderer.render(itemsContainer, item);
                        });
                    }
                });
            }
        } catch (error) {
            console.error('Erro ao carregar checklists:', error);
            this.board.utils.mostrarNotificacao('Erro ao carregar checklists', 'error');
        }
    }
}