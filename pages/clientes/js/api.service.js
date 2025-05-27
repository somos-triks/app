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
    },

    async toggleClienteStatus(clienteId, novoStatus) {
        try {
            const { API_URL, AUTH_TOKEN } = window.appConfig;
            const response = await fetch(`${API_URL}/clientes/${clienteId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${AUTH_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: novoStatus })
            });
            return await response.json();
        } catch (error) {
            console.error('Erro ao alterar status:', error);
            throw error;
        }
    },

    async atualizarCliente(clienteId, dados) {
        try {
            const { API_URL, AUTH_TOKEN } = window.appConfig;
            const response = await fetch(`${API_URL}/clientes/${clienteId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${AUTH_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });
            return await response.json();
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
            throw error;
        }
    },

    async criarTag(nome, cor) {
        try {
            const { API_URL, AUTH_TOKEN } = window.appConfig;
            const response = await fetch(`${API_URL}/tags`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${AUTH_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, cor })
            });
            return await response.json();
        } catch (error) {
            console.error('Erro ao criar tag:', error);
            throw error;
        }
    },

    async vincularTag(tagId, clienteId) {
        try {
            const { API_URL, AUTH_TOKEN } = window.appConfig;
            const response = await fetch(`${API_URL}/tags/${tagId}/clientes`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${AUTH_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ clienteId })
            });
            return await response.json();
        } catch (error) {
            console.error('Erro ao vincular tag:', error);
            throw error;
        }
    },

    async desvincularTag(tagId, clienteId) {
        try {
            const { API_URL, AUTH_TOKEN } = window.appConfig;
            const response = await fetch(`${API_URL}/tags/${tagId}/clientes`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${AUTH_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ clienteId })
            });
            return await response.json();
        } catch (error) {
            console.error('Erro ao desvincular tag:', error);
            throw error;
        }
    }
};

window.clientesService = clientesService;
