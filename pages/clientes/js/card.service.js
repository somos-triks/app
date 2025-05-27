const clientCardService = {
    setLoading(isLoading) {
        const loadingState = document.getElementById('loadingState');
        const grid = document.getElementById('clientesGrid');
        
        if (isLoading) {
            loadingState.classList.remove('hidden');
            grid.classList.add('hidden');
        } else {
            loadingState.classList.add('hidden');
            grid.classList.remove('hidden');
        }
    },

    renderCard(cliente) {
        const defaultImage = `${window.appConfig.BASE_URL}/assets/img/hover.png`;
        
        return `
            <div class="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 transition-shadow duration-300 hover:shadow-lg">
                <div class="p-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <img src="${cliente.foto_perfil || defaultImage}" alt="${cliente.nome}" 
                                class="h-10 w-10 object-cover rounded-full border-2 border-primary-500 shadow-sm transition-transform duration-200 hover:scale-105">
                            <span class="text-base font-medium text-gray-900 dark:text-white">
                                ${cliente.nome}
                            </span>
                        </div>

                        <div class="flex items-center gap-3">
                            ${this.renderTagsPreview(cliente.tags, cliente.id)}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderTagsPreview(tags = [], clienteId) {
        const maxTags = 3;
        const visibleTags = tags.slice(0, maxTags);
        const remainingCount = tags.length - maxTags;

        return `
            ${visibleTags.map(tag => `
                <span class="inline-flex px-2 py-0.5 text-xs rounded-md font-medium shadow-sm transition-all duration-200"
                    style="background: ${tag.cor}; color: #222; border: 1px solid ${tag.cor}30;">
                    ${tag.nome}
                </span>
            `).join('')}
            ${remainingCount > 0 ? `
                <span class="inline-flex px-2 py-0.5 text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md font-medium">
                    +${remainingCount}
                </span>
            ` : ''}
            <button onclick="tagService.showTagManager(${clienteId}, event)" 
                class="p-1 rounded-md bg-primary-50 dark:bg-primary-900/30 hover:bg-primary-100 dark:hover:bg-primary-800/60 text-primary-500 hover:text-primary-700 transition-all duration-200 shadow-sm ml-1">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
            </button>
        `;
    },

    renderList(clientes) {
        const grid = document.getElementById('clientesGrid');
        grid.innerHTML = clientes.map(cliente => this.renderCard(cliente)).join('');
    }
};

window.clientCardService = clientCardService;
