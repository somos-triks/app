class ClienteService {
    constructor() {
        this.API_URL = window.appConfig.API_URL;
        this.AUTH_TOKEN = window.appConfig.AUTH_TOKEN;
        this.selectedClient = this.loadSelectedClientFromStorage();
        this.clientesLoaded = false;
        this.init();
    }

    loadSelectedClientFromStorage() {
        const stored = localStorage.getItem('selectedClient');
        return stored ? JSON.parse(stored) : null;
    }

    async init() {
        this.setupListeners();
        if (this.selectedClient) {
            this.updateSelectedButtonUI(this.selectedClient);
        }
    }

    setupListeners() {
        const clienteButton = document.getElementById('clienteButton');
        const clienteDropdown = document.getElementById('clienteDropdown');

        clienteButton.addEventListener('click', async () => {
            if (!this.clientesLoaded) {
                await this.loadClientes();
                this.clientesLoaded = true;
            }
            clienteDropdown.classList.toggle('hidden');
        });

        // Fechar dropdown quando clicar fora
        document.addEventListener('click', (e) => {
            if (!clienteButton.contains(e.target) && !clienteDropdown.contains(e.target)) {
                clienteDropdown.classList.add('hidden');
            }
        });
    }

    async loadClientes() {
        try {
            const clientesList = document.getElementById('clientesList');
            clientesList.innerHTML = '<div class="text-center py-4">Carregando...</div>';

            const response = await fetch(`${this.API_URL}/clientes`, {
                headers: {
                    'Authorization': `Bearer ${this.AUTH_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();
            
            if (result.success) {
                this.renderClientes(result.data);
            }
        } catch (error) {
            console.error('Erro ao carregar clientes:', error);
            const clientesList = document.getElementById('clientesList');
            clientesList.innerHTML = '<div class="text-center py-4 text-red-500">Erro ao carregar clientes</div>';
        }
    }

    renderClientes(clientes) {
        const clientesList = document.getElementById('clientesList');
        clientesList.innerHTML = '';

        clientes.forEach(cliente => {
            const card = this.createClienteCard(cliente);
            clientesList.appendChild(card);
        });
    }

    createClienteCard(cliente) {
        const div = document.createElement('div');
        const nome = cliente?.nome || 'Sem nome';
        
        div.className = `flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
            this.selectedClient?.id === cliente.id ? 'bg-blue-50 dark:bg-blue-900/30' : ''
        }`;
        
        div.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                ${cliente.foto_perfil ? 
                    `<img src="${cliente.foto_perfil}" class="w-full h-full rounded-full object-cover">` :
                    `<span class="text-sm font-semibold">${nome.charAt(0)}</span>`
                }
            </div>
            <span class="flex-1 text-sm font-medium text-gray-700 dark:text-gray-200">${nome}</span>
            ${cliente.status ? 
                '<span class="h-2 w-2 rounded-full bg-green-500"></span>' : 
                '<span class="h-2 w-2 rounded-full bg-gray-300"></span>'
            }
        `;

        div.addEventListener('click', () => this.selectCliente(cliente));
        return div;
    }

    selectCliente(cliente) {
        this.selectedClient = cliente;
        localStorage.setItem('selectedClient', JSON.stringify(cliente));
        this.updateSelectedButtonUI(cliente);
        
        document.getElementById('clienteDropdown').classList.add('hidden');
        this.renderClientes(Array.from(document.getElementById('clientesList').children));
        
        const event = new CustomEvent('clienteSelected', { detail: cliente });
        document.dispatchEvent(event);
    }

    updateSelectedButtonUI(cliente) {
        const selectedButton = document.getElementById('clienteButton');
        selectedButton.className = 'flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700/50 rounded-lg';
        selectedButton.innerHTML = `
            <div class="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                ${cliente.foto_perfil ? 
                    `<img src="${cliente.foto_perfil}" class="w-full h-full rounded-full object-cover">` :
                    `<span class="text-xs font-semibold">${cliente.nome.charAt(0)}</span>`
                }
            </div>
            <span class="text-sm text-gray-600 dark:text-gray-300">${cliente.nome}</span>
            ${cliente.status ? 
                '<span class="h-2 w-2 rounded-full bg-green-500"></span>' : 
                '<span class="h-2 w-2 rounded-full bg-gray-300"></span>'
            }
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
        `;
    }
}

// Inicializar o serviço
document.addEventListener('DOMContentLoaded', () => {
    window.clienteService = new ClienteService();
});
