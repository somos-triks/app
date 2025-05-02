export class KanbanRenderer {
    constructor(board) {
        if (!board) {
            throw new Error('Board reference is required');
        }
        this.board = board;
    }

    createAddListButton() {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'flex-shrink-0 w-80 flex items-center justify-center bg-gray-50/50 dark:bg-gray-800/50 rounded-lg shadow-sm border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 transition-colors';
        buttonContainer.innerHTML = `
            <button id="addListBtn" class="w-full h-full p-6 flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-primary-500 transition-colors">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
                <span class="text-sm font-medium">Adicionar Lista</span>
            </button>
        `;

        buttonContainer.querySelector('#addListBtn').onclick = () => this.board.listManager.criarNovaLista();
        return buttonContainer;
    }

    removeAddListButton() {
        const existingBtn = document.querySelector('#addListBtn')?.closest('.flex-shrink-0');
        if (existingBtn) {
            existingBtn.remove();
        }
    }

    ensureAddListButton() {
        // Remove qualquer botão existente primeiro
        this.removeAddListButton();
        
        // Cria e adiciona o novo botão sempre no final
        const container = document.getElementById('kanbanListsContainer');
        const addButton = this.createAddListButton();
        container.appendChild(addButton);
    }

    renderizarLista(lista) {
        try {
            const template = this.board.templates.getTemplate('lista');
            if (!template) {
                throw new Error('Template de lista não encontrado');
            }

            const listaElement = template.content.cloneNode(true).querySelector('.kanban-lista');
            listaElement.dataset.listaId = lista.id;
            
            const header = listaElement.querySelector('.lista-header');
            if (header) {
                header.style.borderTop = `3px solid ${lista.cor || '#3b82f6'}`;
            }

            const titulo = listaElement.querySelector('h3');
            if (titulo) {
                titulo.textContent = lista.titulo;
            }
            
            const addCardBtn = listaElement.querySelector('.add-card-btn');
            if (addCardBtn) {
                addCardBtn.onclick = () => this.board.cardManager.iniciarCriacaoCard(lista.id);
            }

            const container = document.getElementById('kanbanListsContainer');
            container.appendChild(listaElement);
            
            return listaElement;
        } catch (error) {
            console.error('Erro ao renderizar lista:', error);
            throw error;
        }
    }

    renderizarCard(listaId, card) {
        const template = this.board.templates.getTemplate('card').content.cloneNode(true);
        const cardElement = template.querySelector('.kanban-card');
        cardElement.dataset.cardId = card.id;
        this.atualizarCardView(cardElement, card);
        
        const container = document.querySelector(`[data-lista-id="${listaId}"] .cards-container`);
        container.appendChild(cardElement);
        return cardElement;
    }

    atualizarCardView(cardElement, card) {
        // Get priority tag color
        const getPriorityColor = (priority) => {
            switch(priority) {
                case 'alta': return 'bg-red-500';
                case 'media': return 'bg-yellow-500';
                case 'baixa': return 'bg-green-500';
                default: return '';
            }
        };
        
        cardElement.innerHTML = `
            <div class="flex flex-col gap-2">
                <div class="flex justify-between items-start gap-2">
                    <h4 class="font-medium text-gray-800 dark:text-gray-200 text-sm flex-1">${card.titulo}</h4>
                    ${card.prioridade ? `
                        <span class="w-2 h-2 rounded-full ${getPriorityColor(card.prioridade)}"></span>
                    ` : ''}
                </div>
                ${card.prazo ? `
                    <div class="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>${this.board.utils.formatarData(card.prazo)}</span>
                    </div>
                ` : ''}
            </div>
        `;

        // Re-add click event
        cardElement.addEventListener('click', (e) => {
            if (!e.target.closest('.edit-card-btn')) {
                this.board.cardModal.showModal(card.id);
            }
        });
    }
}
