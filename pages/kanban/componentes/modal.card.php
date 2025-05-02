<div id="cardModal" class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm hidden z-50">
    <div class="fixed inset-0 flex items-center justify-center p-4">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
            <!-- Modal Header -->
            <div class="flex-shrink-0 p-4 border-b border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between">
                    <div class="flex-1">
                        <input type="text" 
                            id="cardTitle"
                            class="w-full text-lg font-semibold bg-transparent border-0 border-b-2 border-transparent focus:border-primary-500 focus:ring-0 text-gray-900 dark:text-white px-0" 
                            value="">
                    </div>
                    <button data-modal-card-close class="text-gray-400 hover:text-gray-500 focus:outline-none">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Modal Content -->
            <div id="modalContent" class="grid grid-cols-10 flex-1 overflow-hidden">
                <!-- Main Content (70%) -->
                <div class="col-span-7 p-4 space-y-4 overflow-y-auto">
                    <!-- Descrição -->
                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Descrição
                        </label>
                        <textarea 
                            id="cardDescricao"
                            class="w-full min-h-[120px] px-3 py-2 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                            placeholder="Adicione uma descrição..."></textarea>
                    </div>

                    <!-- Grid para Prazo e Prioridade -->
                    <div class="grid grid-cols-2 gap-4">
                        <!-- Prazo -->
                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Prazo
                            </label>
                            <input 
                                type="date" 
                                id="cardPrazo"
                                class="w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                        </div>

                        <!-- Prioridade -->
                        <div class="space-y-2">
                            <div class="flex justify-between items-center">
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Prioridade
                                </label>
                                <span id="prioridadeLabel" class="text-sm font-medium"></span>
                            </div>
                            <div class="relative">
                                <input 
                                    type="range" 
                                    id="cardPrioridade" 
                                    min="0" 
                                    max="2" 
                                    step="1"
                                    class="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary-500"
                                >
                                <div class="flex justify-between px-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    <span>Baixa</span>
                                    <span>Média</span>
                                    <span>Alta</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Checklists -->
                    <div class="space-y-3">
                        <div class="flex items-center justify-between">
                            <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Checklists</h3>
                            <button id="addChecklistGroupBtn" 
                                class="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-primary-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                                </svg>
                                Novo Checklist
                            </button>
                        </div>

                        <!-- Container para grupos de checklist -->
                        <div id="checklistGroups" class="space-y-4">
                            <!-- Template renderizado via JavaScript -->
                        </div>

                        <!-- Template para novo grupo -->
                        <template id="newChecklistGroupTemplate">
                            <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                                <div class="space-y-3">
                                    <input type="text" 
                                        class="w-full px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 
                                        dark:bg-gray-600 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
                                        placeholder="Nome do checklist">
                                    <textarea 
                                        class="w-full px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 
                                        dark:bg-gray-600 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
                                        placeholder="Descrição (opcional)" rows="2"></textarea>
                                    <div class="flex justify-end gap-2">
                                        <button class="cancel-checklist-group px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 
                                            hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md">
                                            Cancelar
                                        </button>
                                        <button class="save-checklist-group px-3 py-1.5 text-sm text-white bg-primary-500 
                                            hover:bg-primary-600 rounded-md flex items-center gap-2">
                                            <span>Criar</span>
                                            <svg class="w-4 h-4 animate-spin hidden" viewBox="0 0 24 24">
                                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </template>

                        <!-- Template para grupo existente -->
                        <template id="checklistGroupTemplate">
                            <div class="checklist-group bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 space-y-2">
                                <div class="flex items-center justify-between gap-2">
                                    <div class="flex items-center gap-2 flex-1">
                                        <h4 class="font-medium text-gray-700 dark:text-gray-200"></h4>
                                        <span class="text-xs text-gray-500">0 de 0</span>
                                    </div>
                                    <div class="flex items-center gap-1">
                                        <button class="add-checklist-item p-1.5 text-gray-400 hover:text-primary-500 hover:bg-gray-100 dark:hover:bg-gray-600 rounded">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                                            </svg>
                                        </button>
                                        <button class="delete-checklist-group p-1.5 text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600 rounded">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                
                                <!-- Container para itens do checklist -->
                                <div class="checklist-items space-y-1.5">
                                    <!-- Items will be rendered here -->
                                </div>
                            </div>
                        </template>

                        <!-- Template para novo item -->
                        <template id="newChecklistItemTemplate">
                            <div class="pl-4 space-y-3">
                                <input type="text" 
                                    class="w-full px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 
                                    dark:bg-gray-600 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
                                    placeholder="Nome do item">
                                <textarea 
                                    class="w-full px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 
                                    dark:bg-gray-600 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
                                    placeholder="Descrição (opcional)" rows="2"></textarea>
                                <div class="flex items-center gap-4">
                                    <div class="flex items-center gap-2">
                                        <input type="date" 
                                            class="px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 
                                            dark:bg-gray-600 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                                    </div>
                                    <label class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                        <input type="checkbox" class="rounded border-gray-300 text-primary-500 focus:ring-primary-500">
                                        Destacar
                                    </label>
                                </div>
                                <div class="flex justify-end gap-2">
                                    <button class="cancel-checklist-item px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 
                                        hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md">
                                        Cancelar
                                    </button>
                                    <button class="save-checklist-item px-3 py-1.5 text-sm text-white bg-primary-500 
                                        hover:bg-primary-600 rounded-md flex items-center gap-2">
                                        <span>Adicionar</span>
                                        <svg class="w-4 h-4 animate-spin hidden" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </template>

                        <!-- Template para item existente -->
                        <template id="checklistItemTemplate">
                            <div class="checklist-item pl-2 flex items-center gap-2 group hover:bg-white dark:hover:bg-gray-600/50 rounded-md p-1.5 transition-colors">
                                <button class="toggle-item flex-shrink-0 w-5 h-5 rounded-full border-2 hover:border-primary-500 transition-colors flex items-center justify-center">
                                    <!-- Check icon added dynamically -->
                                </button>
                                <div class="flex-1 min-w-0 flex items-center gap-3">
                                    <span class="text-sm text-gray-700 dark:text-gray-200 truncate"></span>
                                    <div class="flex items-center gap-2">
                                        <button class="add-date p-1 text-xs text-gray-400 hover:text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                            </svg>
                                        </button>
                                        <span class="data-badge hidden text-xs text-gray-500 bg-gray-100 dark:bg-gray-600 px-2 py-0.5 rounded-full"></span>
                                    </div>
                                </div>
                                <button class="delete-item p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                        </template>
                    </div>
                </div>

                <!-- Actions Sidebar (30%) -->
                <div class="col-span-3 border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-4 overflow-y-auto">
                    <h3 class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">Ações</h3>
                    <button id="deleteCardBtn" class="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-white bg-red-50 hover:bg-red-500 rounded-md transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Deletar
                    </button>
                </div>
            </div>

            <!-- Loading State -->
            <div id="modalLoading" class="hidden p-6 space-y-4">
                <div class="animate-pulse space-y-3">
                    <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
            </div>

            <div class="flex-shrink-0 p-3 bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                Todas as alterações são salvas automaticamente
            </div>
        </div>
    </div>
</div>
