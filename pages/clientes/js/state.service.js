const stateService = {
    clientes: [],

    async initialize() {
        try {
            clientCardService.setLoading(true);
            const clientes = await clientesService.listarClientes();
            this.clientes = Array.isArray(clientes) ? clientes : [];
            clientCardService.renderList(this.clientes);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            document.getElementById('clientesGrid').innerHTML = `
                <div class="text-center py-8 text-red-500">
                    Erro ao carregar dados: ${error.message}
                </div>
            `;
        } finally {
            clientCardService.setLoading(false);
        }
    }
};

window.stateService = stateService;

// Inicialização automática ao carregar o script
document.addEventListener('DOMContentLoaded', () => {
    stateService.initialize();
});
