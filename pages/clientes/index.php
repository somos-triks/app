<?php 
require_once dirname(__DIR__, 2) . '/config/config.php';
require_once ROOT_PATH . '/includes/header.php';
require_once ROOT_PATH . '/includes/sidemenu.php';
?>

<!-- CSS Adicional -->
<link rel="stylesheet" href="<?php echo getenv('BASE_URL'); ?>/assets/css/animations.css">

<!-- Main content -->
<main class="bg-white dark:bg-black min-h-screen pt-16 ml-64">
    <div class="px-6 py-8">
        <!-- Header section with title and actions -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Clientes</h2>
                <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">Gerencie todos os seus clientes</p>
            </div>
            <div class="mt-4 sm:mt-0 flex flex-wrap gap-3">
                <button id="addClienteBtn" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                    </svg>
                    Adicionar Cliente
                </button>
                <!-- Any other buttons/actions -->
            </div>
        </div>
        
        <!-- Search and filter section -->
        <div class="flex flex-col sm:flex-row gap-4 mb-6">
            <div class="flex-grow">
                <div class="relative rounded-md shadow-sm">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <input type="search" id="searchCliente" class="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 pr-3 py-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white rounded-md" placeholder="Buscar clientes...">
                </div>
            </div>
            <!-- Any filters -->
        </div>
        
        <!-- Loading state -->
        <div id="loadingState" class="hidden">
            <div class="flex justify-center items-center p-12">
                <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        </div>
        
        <!-- Client grid -->
        <div id="clientesGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 bg-white dark:bg-black">
            <!-- Card content will be rendered by card.service.js -->
        </div>
        
        <!-- Empty state (if needed) -->
        <div id="emptyState" class="hidden text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">Nenhum cliente encontrado</h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Comece adicionando um novo cliente.</p>
        </div>
    </div>
</main>

<!-- Scripts -->
<script src="<?php echo getenv('BASE_URL'); ?>/pages/clientes/js/api.service.js"></script>
<script src="<?php echo getenv('BASE_URL'); ?>/pages/clientes/js/card.service.js"></script>
<script src="<?php echo getenv('BASE_URL'); ?>/pages/clientes/js/state.service.js"></script>

<?php require_once ROOT_PATH . '/includes/footer.php'; ?>

