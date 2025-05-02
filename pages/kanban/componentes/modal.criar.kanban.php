<div id="modalCriarKanban" class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm hidden overflow-y-auto h-full w-full z-50" role="dialog">
    <div class="relative top-20 mx-auto p-8 max-w-md shadow-lg rounded-xl bg-white dark:bg-gray-800">
        <div class="mb-6">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Criar Novo Kanban</h3>
            <p class="text-gray-600 dark:text-gray-400 mt-1">Preencha as informações do kanban</p>
        </div>

        <form id="formCriarKanban" class="space-y-6">
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Título</label>
                <div class="relative">
                    <input 
                        type="text" 
                        name="titulo" 
                        required 
                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all duration-200 ease-in-out dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                        placeholder="Digite o título do kanban"
                    >
                </div>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Descrição</label>
                <div class="relative">
                    <textarea 
                        name="descricao" 
                        rows="3" 
                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all duration-200 ease-in-out dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                        placeholder="Digite a descrição do kanban"
                    ></textarea>
                </div>
            </div>

            <input type="hidden" name="cliente_id" id="cliente_id">

            <div class="flex justify-end gap-3 pt-4">
                <button 
                    type="button" 
                    onclick="appService.closeModal()" 
                    class="px-6 py-2.5 border border-gray-300 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200 ease-in-out"
                >
                    Cancelar
                </button>
                <button 
                    type="submit" 
                    class="px-6 py-2.5 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transform transition-all duration-200 ease-in-out hover:scale-[1.02]"
                >
                    Criar
                </button>
            </div>
        </form>
    </div>
</div>
