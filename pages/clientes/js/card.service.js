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
        // Smaller company icon with proper color
        const companySvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 8h12M6 12h12M6 16h12"/></svg>`;
        
        const statusClass = cliente.ativo ? 'bg-green-500' : 'bg-gray-400';
        const tipoPessoa = cliente.tipo_pessoa === 'F' ? 'Física' : 'Jurídica';
        
        return `
            <a href="${window.appConfig.BASE_URL}/cliente/${cliente.id}" class="block group">
                <div class="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                    <div class="relative">
                        <div class="p-5">
                            <div class="flex items-start gap-4">
                                <div class="relative">
                                    ${cliente.foto_perfil ? 
                                    `<img src="${cliente.foto_perfil}" alt="${cliente.nome}" class="h-12 w-12 object-cover rounded-full border-2 border-primary-500 transition-transform duration-200 group-hover:scale-110">` : 
                                    `<div class="h-12 w-12 rounded-full border-2 border-primary-500 flex items-center justify-center bg-gray-100 dark:bg-gray-800 transition-transform duration-200 group-hover:scale-110">${companySvg}</div>`}
                                    <span class="absolute bottom-0 right-0 h-3 w-3 rounded-full ${statusClass} border-2 border-white dark:border-black"></span>
                                </div>
                                <div class="flex-1">
                                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                        ${cliente.nome}
                                    </h3>
                                   
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-50 dark:bg-black px-5 py-2 flex justify-between items-center border-t border-gray-100 dark:border-gray-800">
                            <span class="text-xs font-medium text-gray-500 dark:text-gray-400">
                                Status: ${cliente.ativo ? 'Ativo' : 'Inativo'}
                            </span>
                            <span class="bg-primary-50 dark:bg-black text-primary-700 dark:text-primary-400 text-xs px-2.5 py-0.5 rounded-full font-medium inline-flex items-center border border-primary-200 dark:border-primary-800">
                                Pessoa ${tipoPessoa}
                            </span>
                        </div>
                    </div>
                </div>
            </a>
        `;
    },

    renderList(clientes) {
        const grid = document.getElementById('clientesGrid');
        
        // Update the grid to have list layout (full width, one below the other)
        grid.className = "grid grid-cols-1 gap-4 bg-white dark:bg-black";
        
        grid.innerHTML = clientes.map(cliente => this.renderCard(cliente)).join('');
    }
};

window.clientCardService = clientCardService;
