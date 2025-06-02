/**
 * Cliente Search Service
 * Manages client searching functionality
 */

const searchService = {
    init() {
        this.searchInput = document.getElementById('searchCliente');
        if (!this.searchInput) return;

        this.bindEvents();
    },

    bindEvents() {
        // Use debounce to prevent excessive processing while typing
        const debounce = (func, delay) => {
            let timeout;
            return function(...args) {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, args), delay);
            };
        };

        // Handle search input with 300ms debounce
        this.searchInput.addEventListener('input', debounce(this.handleSearch.bind(this), 300));
    },

    handleSearch(event) {
        const searchTerm = event.target.value.trim().toLowerCase();

        // Se a busca estiver vazia, mostra todos os clientes
        if (!searchTerm) {
            if (window.stateService && window.stateService.clientes) {
                window.clientCardService.renderList(window.stateService.clientes);
            }
            return;
        }

        // Filtra clientes baseado no termo de busca (apenas pelo nome)
        this.filterClients(searchTerm);
    },

    filterClients(searchTerm) {
        // Obtém clientes do state
        const allClients = window.stateService && window.stateService.clientes ?
            window.stateService.clientes : [];

        // Filtra clientes apenas por nome que contenha o termo de busca
        const filteredClients = allClients.filter(client => {
            return (
                client.nome && client.nome.toLowerCase().includes(searchTerm)
            );
        });

        // Renderiza clientes filtrados
        window.clientCardService.renderList(filteredClients);

        // Mostra estado vazio se não houver resultados
        const emptyState = document.getElementById('emptyState');
        if (emptyState) {
            if (filteredClients.length === 0) {
                emptyState.classList.remove('hidden');
                emptyState.querySelector('h3').textContent = 'Nenhum cliente encontrado';
                emptyState.querySelector('p').textContent = `Não foram encontrados resultados para "${searchTerm}"`;
            } else {
                emptyState.classList.add('hidden');
            }
        }
    }
};

// Inicializa o serviço de busca quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    searchService.init();
});
