const clientCardService = {
    tags: [],

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

    renderTags(clienteTags = []) {
        if (!clienteTags.length) return '';
        
        return `
            <div class="flex flex-wrap gap-2 mt-4">
                ${clienteTags.map(tag => `
                    <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium 
                        ${tag.cor ? 
                            `bg-${tag.cor}-100 text-${tag.cor}-800 dark:bg-${tag.cor}-900/30 dark:text-${tag.cor}-400` : 
                            'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                        }">
                        ${tag.nome}
                    </span>
                `).join('')}
            </div>
        `;
    },

    renderCard(cliente) {
        const defaultImage = `${window.appConfig.BASE_URL}/assets/img/hover.jpg`;
        const profileImage = cliente.foto_perfil || defaultImage;
        
        return `
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <div class="p-6">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <div class="flex-shrink-0">
                                <img src="${profileImage}" alt="${cliente.nome}" 
                                    class="h-12 w-12 rounded-full object-cover border-2 border-primary-100 dark:border-primary-900">
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                    ${cliente.nome}
                                </h3>
                            </div>
                        </div>
                        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                            cliente.status 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        }">
                            ${cliente.status ? 'Ativo' : 'Inativo'}
                        </span>
                    </div>
                    ${this.renderTags(cliente.tags)}
                </div>
            </div>
        `;
    },

    renderList(clientes, targetElement) {
        targetElement.innerHTML = clientes.map(cliente => this.renderCard(cliente)).join('');
    },

    async initialize() {
        try {
            this.setLoading(true);
            const [clientes, tags] = await Promise.all([
                clientesService.listarClientes(),
                clientesService.getTags()
            ]);
            this.tags = tags;
            const grid = document.getElementById('clientesGrid');
            this.renderList(clientes, grid);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        } finally {
            this.setLoading(false);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    clientCardService.initialize();
});
