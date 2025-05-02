export class KanbanCardModal {
    constructor(board) {
        if (!board) {
            throw new Error('Board reference is required');
        }
        this.board = board;
        this.modal = document.getElementById('cardModal');
        this.currentCardId = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Close button handlers
        document.querySelectorAll('[data-modal-card-close]').forEach(button => {
            button.addEventListener('click', () => this.hideModal());
        });

        // Click outside to close
        this.modal?.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hideModal();
            }
        });

        // Delete button handler
        document.getElementById('deleteCardBtn')?.addEventListener('click', async () => {
            if (!this.currentCardId) return;

            if (confirm('Tem certeza que deseja deletar este card?')) {
                try {
                    await kanbanService.deletarCard(this.currentCardId);
                    
                    // Remove card from list
                    const cardElement = document.querySelector(`[data-card-id="${this.currentCardId}"]`);
                    if (cardElement) {
                        cardElement.remove();
                    }
                    
                    this.hideModal();
                    this.board.utils.mostrarNotificacao('Card deletado com sucesso', 'success');
                } catch (error) {
                    this.board.utils.mostrarNotificacao('Erro ao deletar card', 'error');
                }
            }
        });

        // Auto-save fields
        const fields = ['cardTitle', 'cardDescricao', 'cardPrazo', 'cardPrioridade'];
        fields.forEach(fieldId => {
            const element = document.getElementById(fieldId);
            if (element) {
                element.addEventListener('change', () => this.salvarAlteracoes());
                if (element.tagName === 'TEXTAREA' || element.tagName === 'INPUT') {
                    element.addEventListener('blur', () => this.salvarAlteracoes());
                }
            }
        });

        // Debounce para o título e descrição
        let timeout;
        ['cardTitle', 'cardDescricao'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', () => {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => this.salvarAlteracoes(), 1000);
                });
            }
        });

        const prioridadeInput = document.getElementById('cardPrioridade');
        prioridadeInput.addEventListener('input', () => {
            this.updatePrioridadeLabel();
            this.salvarAlteracoes();
        });

        document.getElementById('cardPrazo').addEventListener('change', () => this.salvarAlteracoes());
    }

    updatePrioridadeLabel() {
        const prioridades = ['Baixa', 'Média', 'Alta'];
        const valor = document.getElementById('cardPrioridade').value;
        const label = document.getElementById('prioridadeLabel');
        const cores = ['text-green-500', 'text-yellow-500', 'text-red-500'];
        
        label.textContent = prioridades[valor];
        label.className = `text-sm font-medium ${cores[valor]}`;
    }

    async salvarAlteracoes() {
        if (!this.currentCardId) return;

        try {
            const prioridadeValues = ['baixa', 'media', 'alta'];
            const prioridadeRange = parseInt(document.getElementById('cardPrioridade').value);
            
            // Pegar o card atual para preservar lista_id e ordem
            const cardElement = document.querySelector(`[data-card-id="${this.currentCardId}"]`);
            const listaId = cardElement.closest('.kanban-lista').dataset.listaId;
            const cards = cardElement.closest('.cards-container').querySelectorAll('.kanban-card');
            const ordem = Array.from(cards).indexOf(cardElement) + 1;

            const dados = {
                titulo: document.getElementById('cardTitle').value,
                descricao: document.getElementById('cardDescricao').value,
                prazo: document.getElementById('cardPrazo').value || null,
                prioridade: prioridadeValues[prioridadeRange],
                lista_id: listaId,
                ordem: ordem // Mantém a ordem original
            };

            const response = await kanbanService.atualizarCard(this.currentCardId, dados);
            
            if (response.success) {
                const cardElement = document.querySelector(`[data-card-id="${this.currentCardId}"]`);
                if (cardElement) {
                    // Atualiza apenas os dados modificáveis pelo modal
                    const dadosAtualizados = {
                        ...response.data,
                        ordem: ordem, // Força manter a ordem original
                        lista_id: listaId // Força manter na mesma lista
                    };
                    this.board.renderer.atualizarCardView(cardElement, dadosAtualizados);
                }
            }
        } catch (error) {
            this.board.utils.mostrarNotificacao('Erro ao salvar alterações', 'error');
        }
    }

    async showModal(cardId) {
        try {
            this.currentCardId = cardId;
            this.showLoading(true);
            this.modal.classList.remove('hidden');
            
            const response = await kanbanService.getCardDetalhes(cardId);
            if (response.success) {
                this.preencherCampos(response.data);
                // Carrega os checklists com o novo formato
                await this.board.checklistManager.carregarChecklists(response.data);
            }
        } catch (error) {
            console.error('Erro ao carregar card:', error);
            this.board.utils.mostrarNotificacao('Erro ao carregar detalhes do card', 'error');
            this.hideModal();
        } finally {
            this.showLoading(false);
        }
    }

    preencherCampos(card) {
        document.getElementById('cardTitle').value = card.titulo || '';
        document.getElementById('cardDescricao').value = card.descricao || '';
        document.getElementById('cardPrazo').value = card.prazo || '';
        
        const prioridadeValues = { 'baixa': 0, 'media': 1, 'alta': 2 };
        document.getElementById('cardPrioridade').value = prioridadeValues[card.prioridade] || 0;
        this.updatePrioridadeLabel();
    }

    hideModal() {
        this.modal.classList.add('hidden');
        document.getElementById('cardTitle').textContent = '';
        document.getElementById('cardDescricao').textContent = '';
        document.getElementById('cardPrazo').textContent = '';
        document.getElementById('cardPrioridade').textContent = '';
    }

    showLoading(show) {
        const content = document.getElementById('modalContent');
        const loading = document.getElementById('modalLoading');
        
        if (!content || !loading) return;
        
        if (show) {
            content.classList.add('hidden');
            loading.classList.remove('hidden');
        } else {
            loading.classList.add('hidden');
            content.classList.remove('hidden');
        }
    }
}
