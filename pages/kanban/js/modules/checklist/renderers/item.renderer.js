export class ItemRenderer {
    constructor(board, itemActions) {
        this.board = board;
        this.itemActions = itemActions;
    }

    render(container, item) {
        const itemEl = document.createElement('div');
        itemEl.className = 'checklist-item flex items-start gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg group transition-colors';
        itemEl.dataset.itemId = item.id;
        
        itemEl.innerHTML = this.getItemTemplate(item);
        this.setupEventListeners(itemEl, item);
        
        container.appendChild(itemEl);
        return itemEl;
    }

    getItemTemplate(item) {
        return `
            <button class="toggle-item flex-shrink-0 w-5 h-5 mt-0.5 rounded-full border-2 
                ${item.marcacao ? 'bg-primary-500 border-primary-500' : 'border-gray-300 dark:border-gray-600'} 
                hover:border-primary-500 transition-colors flex items-center justify-center">
                ${item.marcacao ? this.getCheckmarkSvg() : ''}
            </button>
            <div class="flex-1 min-w-0">
                <div class="text-sm text-gray-700 dark:text-gray-200 cursor-pointer break-words" 
                    contenteditable="true">${item.nome}</div>
                ${item.prazo ? this.getPrazoTemplate(item.prazo) : ''}
            </div>
            <button class="delete-item opacity-0 group-hover:opacity-100 p-1 text-gray-400 
                hover:text-red-500 transition-all">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        `;
    }

    setupEventListeners(itemEl, item) {
        this.setupToggleButton(itemEl, item);
        this.setupNomeEditor(itemEl, item);
        this.setupDeleteButton(itemEl, item);
    }

    // ... métodos auxiliares para templates e event listeners
}
