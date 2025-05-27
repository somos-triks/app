const stateService = {
    clientes: [],

    async initialize() {
        try {
            clientCardService.setLoading(true);
            const [clientes, tags] = await Promise.all([
                clientesService.listarClientes(),
                clientesService.getTags()
            ]);
            this.clientes = clientes;
            tagService.tags = tags;
            clientCardService.renderList(this.clientes);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        } finally {
            clientCardService.setLoading(false);
        }
    },

    updateClienteLocally(clienteId, updates) {
        const index = this.clientes.findIndex(c => c.id === clienteId);
        if (index > -1) {
            this.clientes[index] = { ...this.clientes[index], ...updates };
            clientCardService.renderList(this.clientes);
        }
    },

    updateTagsLocally(clienteId, tagId, isAdding) {
        const cliente = this.clientes.find(c => c.id === clienteId);
        if (!cliente) return;

        if (isAdding) {
            const tag = tagService.tags.find(t => t.id === tagId);
            if (tag && !cliente.tags.some(t => t.id === tagId)) {
                cliente.tags.push(tag);
            }
        } else {
            cliente.tags = cliente.tags.filter(t => t.id !== tagId);
        }
        
        clientCardService.renderList(this.clientes);
    }
};

window.stateService = stateService;
