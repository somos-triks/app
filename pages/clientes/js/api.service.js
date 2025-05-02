const clientesService = {
    async listarClientes() {
        try {
            const { API_URL, AUTH_TOKEN } = window.appConfig;
            
            const response = await fetch(`${API_URL}/clientes`, {
                headers: {
                    'Authorization': `Bearer ${AUTH_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao carregar clientes. Verifique sua autenticação.');
            }

            const data = await response.json();
            if (!data.success) {
                throw new Error(data.message);
            }

            return data.data;
        } catch (error) {
            console.error('Erro ao listar clientes:', error);
            throw error;
        }
    },

    async getTags() {
        try {
            const { API_URL, AUTH_TOKEN } = window.appConfig;
            
            const response = await fetch(`${API_URL}/tags`, {
                headers: {
                    'Authorization': `Bearer ${AUTH_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao carregar tags.');
            }

            const data = await response.json();
            if (!data.success) {
                throw new Error(data.message);
            }

            return data.data;
        } catch (error) {
            console.error('Erro ao listar tags:', error);
            throw error;
        }
    }
};
