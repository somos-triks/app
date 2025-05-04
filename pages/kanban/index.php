<?php 
require_once dirname(__DIR__, 2) . '/config/config.php';
require_once ROOT_PATH . '/includes/header.php';
require_once ROOT_PATH . '/includes/sidemenu.php';
?>

<style>
    /* Animações personalizadas do Tailwind */
    @keyframes wiggle {
        0%, 100% { transform: rotate(-3deg); }
        50% { transform: rotate(3deg); }
    }
    
    .animate-wiggle {
        animation: wiggle 0.5s ease-in-out infinite;
    }
    
    @keyframes ping {
        75%, 100% { transform: scale(1.5); opacity: 0; }
    }
    
    .animate-ping {
        animation: ping 0.8s cubic-bezier(0, 0, 0.2, 1) 1;
    }
    .snap-x {
    scroll-snap-type: x mandatory;
}
    .snap-center {
        scroll-snap-align: center;
    }
</style>

<div class="min-h-screen">
    <main class="lg:ml-20 pt-16 transition-all duration-300 lg:group-hover/sidemenu:ml-64">
        <div class="p-6 lg:p-8">
            <!-- Header Section -->
            <div class="relative overflow-hidden rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 p-4 mb-4">
                <div class="flex items-center justify-between gap-4">
                    <div class="flex items-center gap-2">
                        <select id="kanban-select" class="w-56 px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600">
                            <option value="">Selecione um kanban</option>
                        </select>
                        <button onclick="appService.showModal()" class="px-3 py-1.5 text-sm bg-primary-500 text-white rounded-md hover:bg-primary-600">
                           +
                        </button>
                    </div>
                </div>
            </div>

            <!-- Loading State -->
            <div id="loadingState" class="animate-pulse space-y-6">
                <!-- Similar loading state as clientes -->
            </div>

            <!-- Kanban Board -->
            <div id="kanbanBoard" class="hidden">
                <!-- Kanban Lists Container -->
                <div id="kanbanListsContainer" class="flex gap-6 overflow-x-auto pb-4 min-h-[calc(100vh-16rem)]">
                    <!-- Lists will be dynamically added here -->
                    <div class="flex-shrink-0 w-80 flex items-center justify-center bg-gray-50/50 dark:bg-gray-800/50 rounded-lg shadow-sm border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 transition-colors">
                        <button id="addListBtn" class="w-full h-full p-6 flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-primary-500 transition-colors">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                            </svg>
                            <span class="text-sm font-medium">Adicionar Lista</span>
                        </button>
                    </div>
                </div>

                <!-- Templates -->
                <template id="listTemplate">
                    <div class="kanban-lista flex-shrink-0 w-80 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
                        <div class="p-4 lista-header">
                            <div class="flex items-center justify-between mb-4">
                                <h3 class="font-semibold text-gray-700 dark:text-gray-200"></h3>
                                <button class="add-card-btn p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                                    <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div class="cards-container p-4 space-y-3 min-h-[200px]"></div>
                    </div>
                </template>

                <!-- Template for Card -->
                <template id="cardTemplate">
                    <div class="kanban-card bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 cursor-move hover:shadow-md transition-shadow group">
                        <div class="flex justify-between items-center gap-2">
                            <h4 class="font-medium text-gray-800 dark:text-gray-200 text-sm flex-1"></h4>
                            <button class="edit-card-btn p-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </main>
</div>

<!-- Include Modal -->
<?php require_once ROOT_PATH . '/pages/kanban/componentes/modal.criar.kanban.php'; ?>
<?php require_once ROOT_PATH . '/pages/kanban/componentes/modal.card.php'; ?>

<!-- Scripts -->
<script src="https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js"></script>
<script src="<?php echo getenv('BASE_URL'); ?>/pages/kanban/js/api.service.js"></script>
<script src="<?php echo getenv('BASE_URL'); ?>/pages/kanban/js/app.service.js"></script>
<script type="module" src="<?php echo getenv('BASE_URL'); ?>/pages/kanban/js/modules/card-upload/kanban.file.uploader.js"></script>

<script type="module">
    import { KanbanBoard } from '<?php echo getenv('BASE_URL'); ?>/pages/kanban/js/modules/kanban.board.js';
    import { KanbanFileUploader } from '<?php echo getenv('BASE_URL'); ?>/pages/kanban/js/modules/card-upload/kanban.file.uploader.js';
    
    let kanbanApp;
    let fileUploader;
    
    document.addEventListener('DOMContentLoaded', async () => {
        try {
            kanbanApp = new KanbanBoard();
            await kanbanApp.init();
            
            // Inicializa o uploader depois do board
            fileUploader = new KanbanFileUploader();
            window.kanbanFileUploader = fileUploader;
        } catch (error) {
            console.error('Erro ao inicializar:', error);
        }
    });
</script>

<!-- Adicionar event listener para cliente selecionado -->
<script>
document.addEventListener('clienteSelected', (event) => {
    appService.atualizarListaKanbans();
});
</script>


<?php require_once ROOT_PATH . '/includes/footer.php'; ?>

