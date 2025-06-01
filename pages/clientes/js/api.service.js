const clientesService = {
    async listarClientes() {
        try {
            const { API_URL, AUTH_TOKEN } = window.appConfig;
            
            if (!API_URL || !AUTH_TOKEN) {
                throw new Error('Configuração da API incompleta');
            }
            
            const response = await fetch(`${API_URL}/clientes`, {
                headers: {
                    'Authorization': `Bearer ${AUTH_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Erro ao carregar clientes');
            }

            const data = await response.json();
            return Array.isArray(data.data) ? data.data : [];
        } catch (error) {
            console.error('Erro ao listar clientes:', error);
            throw new Error(`Falha ao carregar clientes: ${error.message}`);
        }
    }
};

window.clientesService = clientesService;
