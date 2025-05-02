const appService = {
    showModal() {
        const modal = document.getElementById('novoKanbanModal');
        if (modal) modal.classList.remove('hidden');
    },

    hideModal() {
        const modal = document.getElementById('novoKanbanModal');
        if (modal) modal.classList.add('hidden');
    },

    async criarNovoKanban(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        
        try {
            const dados = {
                cliente_id: formData.get('cliente_id'),
                titulo: formData.get('titulo'),
                descricao: formData.get('descricao')
            };

            const response = await kanbanService.criarKanban(dados);
            
            if (response.success) {
                this.hideModal();
                form.reset();
                await this.atualizarListaKanbans(dados.cliente_id);
            }
        } catch (error) {
            console.error('Erro ao criar kanban:', error);
        }
    },

    async atualizarListaKanbans() {
        try {
            const response = await kanbanService.listarKanbansPorCliente();
            if (response.success) {
                const select = document.getElementById('kanban-select');
                select.innerHTML = '<option value="">Selecione um kanban</option>';
                response.data.forEach(kanban => {
                    select.insertAdjacentHTML('beforeend', `
                        <option value="${kanban.id}">${kanban.titulo}</option>
                    `);
                });
                this.selecionarPrimeiroKanban();
            }
        } catch (error) {
            console.error('Erro ao atualizar lista de kanbans:', error);
        }
    },

    selecionarPrimeiroKanban() {
        const select = document.getElementById('kanban-select');
        if (select.options.length > 1) {
            select.selectedIndex = 1; 
            select.dispatchEvent(new Event('change')); 
        }
    },

    notificacao(mensagem, tipo = 'info') {
        const toast = document.createElement('div');
        toast.className = `fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${
            tipo === 'error' ? 'bg-red-500' : 'bg-green-500'
        } text-white z-50`;
        toast.textContent = mensagem;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    },

    async init() {
        // Inicializar listeners de eventos
        const novoKanbanForm = document.getElementById('novoKanbanForm');
        if (novoKanbanForm) {
            novoKanbanForm.addEventListener('submit', this.criarNovoKanban.bind(this));
        }

        // Outros listeners e inicializações necessárias
        const closeModalBtn = document.querySelector('[data-modal-close]');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', this.hideModal.bind(this));
        }
    }
};

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    appService.init();
});
