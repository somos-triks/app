<?php 
require_once dirname(__DIR__, 2) . '/config/config.php';
require_once ROOT_PATH . '/includes/header.php';
require_once ROOT_PATH . '/includes/sidemenu.php';
?>

<div class="min-h-screen">
    <main class="lg:ml-20 pt-16 transition-all duration-300 lg:group-hover/sidemenu:ml-64">
        <div class="p-6 lg:p-8">
            <!-- Header Section -->
            <div class="relative overflow-hidden rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 p-6 lg:p-8 mb-6">
                <div class="relative z-10">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary-50 dark:bg-primary-900/30 mb-4">
                        <div class="w-1 h-1 rounded-full bg-primary-500"></div>
                        <span class="text-sm font-medium text-primary-600 dark:text-primary-400">Clientes</span>
                    </div>
                    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Lista de Clientes</h1>
                </div>
            </div>

            <!-- Card List Section -->
            <div class="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-lg overflow-hidden">
                <div class="p-6">
                    <!-- Loading State -->
                    <div id="loadingState" class="animate-pulse space-y-6">
                        <?php for($i = 0; $i < 4; $i++): ?>
                        <div class="bg-white dark:bg-gray-800 rounded-lg p-6">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center space-x-4">
                                    <div class="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                                    <div class="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                </div>
                                <div class="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                            </div>
                            <div class="flex gap-2 mt-4">
                                <div class="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                                <div class="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                            </div>
                        </div>
                        <?php endfor; ?>
                    </div>

                    <!-- Cards List -->
                    <div id="clientesGrid" class="space-y-4 hidden">
                        <!-- Cards will be inserted here by JavaScript -->
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>


<!-- Scripts -->
<script src="<?php echo getenv('BASE_URL'); ?>/pages/clientes/js/api.service.js"></script>
<script src="<?php echo getenv('BASE_URL'); ?>/pages/clientes/js/card.service.js"></script>

<?php require_once ROOT_PATH . '/includes/footer.php'; ?>

