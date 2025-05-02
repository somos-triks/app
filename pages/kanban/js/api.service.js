const kanbanService = {
    async listarKanbansPorCliente() {
        try {
            const { API_URL, AUTH_TOKEN } = window.appConfig;
            const selectedClient = window.clienteService.selectedClient;
            
            if (!selectedClient) {
                throw new Error('Nenhum cliente selecionado');
            }
            
            const response = await fetch(`${API_URL}/kanbans/cliente/${selectedClient.id}`, {
                headers: {
                    'Authorization': `Bearer ${AUTH_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('[API] Resposta não OK:', {
                    status: response.status,
                    statusText: response.statusText,
                    data
                });
                throw new Error('Erro ao carregar kanbans do cliente.');
            }

            return data;
        } catch (error) {
            console.error('[API.listarKanbansPorCliente] Erro detalhado:', {
                message: error.message,
                error
            });
            throw error;
        }
    },

    async criarKanban(dados) {
        try {
            const { API_URL, AUTH_TOKEN } = window.appConfig;
            
            const response = await fetch(`${API_URL}/kanbans`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${AUTH_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });

            if (!response.ok) {
                throw new Error('Erro ao criar kanban');
            }

            const data = await response.json();
            if (!data.success) {
                throw new Error(data.message);
            }

            return data.data;
        } catch (error) {
            console.error('Erro ao criar kanban:', error);
            throw error;
        }
    },

    async getKanbanCompleto(kanbanId) {
        try {
            console.log('Requisitando kanban completo:', kanbanId);
            const { API_URL, AUTH_TOKEN } = window.appConfig;
            
            const response = await fetch(`${API_URL}/kanbans/completo/${kanbanId}`, {
                headers: {
                    'Authorization': `Bearer ${AUTH_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status} - ${data.message || 'Erro desconhecido'}`);
            }

            if (!data.success) {
                throw new Error(data.message || 'Erro ao processar dados do kanban');
            }

            return data;
        } catch (error) {
            console.error('Erro detalhado ao carregar kanban completo:', error);
            throw new Error(`Erro ao carregar kanban: ${error.message}`);
        }
    },

    async criarLista(dados) {
        try {
            const { API_URL, AUTH_TOKEN } = window.appConfig;
            
            const response = await fetch(`${API_URL}/kanban-listas`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${AUTH_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });

            const data = await response.json();
            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Erro ao criar lista');
            }
            return data;
        } catch (error) {
            console.error('Erro ao criar lista:', error);
            throw error;
        }
    },

    async criarCard(dados) {
        try {
            const { API_URL, AUTH_TOKEN } = window.appConfig;
            
            const response = await fetch(`${API_URL}/kanban-cards`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${AUTH_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });

            const data = await response.json();
            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Erro ao criar card');
            }
            return data;
        } catch (error) {
            console.error('Erro ao criar card:', error);
            throw error;
        }
    },

    async atualizarPosicaoCard(cardId, novaListaId, novaOrdem) {
        try {
            const { API_URL, AUTH_TOKEN } = window.appConfig;
            
            const response = await fetch(`${API_URL}/kanban-cards/${cardId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${AUTH_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    lista_id: novaListaId,
                    ordem: novaOrdem
                })
            });

            const data = await response.json();
            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Erro ao atualizar posição do card');
            }

            return data;
        } catch (error) {
            console.error('Erro ao atualizar posição do card:', error);
            throw error;
        }
    },

    async getCardDetalhes(cardId) {
        try {
            const { API_URL, AUTH_TOKEN } = window.appConfig;
            
            const response = await fetch(`${API_URL}/kanban-cards/${cardId}`, {
                headers: {
                    'Authorization': `Bearer ${AUTH_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Erro ao carregar detalhes do card');
            }
            return data;
        } catch (error) {
            console.error('Erro ao carregar detalhes do card:', error);
            throw error;
        }
    },

    async atualizarCard(cardId, dados) {
        try {
            const { API_URL, AUTH_TOKEN } = window.appConfig;
            
            const response = await fetch(`${API_URL}/kanban-cards/${cardId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${AUTH_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });

            const data = await response.json();
            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Erro ao atualizar card');
            }
            return data;
        } catch (error) {
            console.error('Erro ao atualizar card:', error);
            throw error;
        }
    },

    async deletarCard(cardId) {
        try {
            const { API_URL, AUTH_TOKEN } = window.appConfig;
            
            const response = await fetch(`${API_URL}/kanban-cards/${cardId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${AUTH_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Erro ao deletar card');
            }
            return data;
        } catch (error) {
            console.error('Erro ao deletar card:', error);
            throw error;
        }
    },

    // Grupos de Checklist
    async criarGrupoChecklist(dados) {
        try {
            const { API_URL, AUTH_TOKEN } = window.appConfig;
            
            const response = await fetch(`${API_URL}/kanban-grupos-checklist`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${AUTH_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });

            const data = await response.json();
            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Erro ao criar grupo de checklist');
            }
            return data;
        } catch (error) {
            console.error('Erro ao criar grupo de checklist:', error);
            throw error;
        }
    },

    async editarGrupoChecklist(grupoId, dados) {
        try {
            const { API_URL, AUTH_TOKEN } = window.appConfig;
            
            const response = await fetch(`${API_URL}/kanban-grupos-checklist/${grupoId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${AUTH_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });

            const data = await response.json();
            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Erro ao editar grupo de checklist');
            }
            return data;
        } catch (error) {
            console.error('Erro ao editar grupo de checklist:', error);
            throw error;
        }
    },

    async deletarGrupoChecklist(grupoId) {
        try {
            const { API_URL, AUTH_TOKEN } = window.appConfig;
            
            // Log para depuração
            console.log('[API] Deletando grupo checklist:', grupoId);
            
            const response = await fetch(`${API_URL}/kanban-grupos-checklist/${grupoId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${AUTH_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            
            // Log detalhado para depuração
            console.log('[API] Resposta ao deletar grupo:', {
                status: response.status,
                ok: response.ok,
                data: data
            });
            
            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Erro ao deletar grupo de checklist');
            }
            return data;
        } catch (error) {
            console.error('Erro detalhado ao deletar grupo de checklist:', error);
            throw error;
        }
    },

    // Itens de Checklist
    async criarItemChecklist(dados) {
        try {
            const { API_URL, AUTH_TOKEN } = window.appConfig;
            
            const response = await fetch(`${API_URL}/kanban-checklist`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${AUTH_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });

            const data = await response.json();
            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Erro ao criar item de checklist');
            }
            return data;
        } catch (error) {
            console.error('Erro ao criar item de checklist:', error);
            throw error;
        }
    },

    async editarItemChecklist(itemId, dados) {
        try {
            const { API_URL, AUTH_TOKEN } = window.appConfig;
            
            const response = await fetch(`${API_URL}/kanban-checklist/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${AUTH_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });

            const data = await response.json();
            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Erro ao editar item de checklist');
            }
            return data;
        } catch (error) {
            console.error('Erro ao editar item de checklist:', error);
            throw error;
        }
    },

    async deletarItemChecklist(itemId) {
        try {
            const { API_URL, AUTH_TOKEN } = window.appConfig;
            
            const response = await fetch(`${API_URL}/kanban-checklist/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${AUTH_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Erro ao deletar item de checklist');
            }
            return data;
        } catch (error) {
            console.error('Erro ao deletar item de checklist:', error);
            throw error;
        }
    }
};