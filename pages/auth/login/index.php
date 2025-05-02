<?php require_once dirname(__DIR__, 3) . '/config/config.php'; ?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Triks</title>
    <link href="<?php echo getenv('BASE_URL'); ?>/assets/css/output.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body class="bg-gray-50 font-sans">
    <div class="min-h-screen flex flex-col lg:flex-row">
        <!-- Lado Esquerdo - Imagem e Logo -->
        <div class="lg:w-1/2 bg-primary-500 p-8 lg:p-12 flex flex-col justify-between">
            <div class="flex justify-center lg:justify-start">
                <img src="<?php echo getenv('BASE_URL'); ?>/assets/img/logo-preta.svg" alt="Logo" class="h-8">
            </div>
            <div class="hidden lg:block">
                <h2 class="text-white text-3xl font-bold mb-4">Bem-vindo de volta!</h2>
                <p class="text-primary-100">Acesse sua conta para continuar gerenciando seus projetos.</p>
            </div>
        </div>

        <!-- Lado Direito - Formulário -->
        <div class="lg:w-1/2 p-8 lg:p-12 flex items-center justify-center">
            <div class="w-full max-w-md">
                <!-- Adicionar div para mensagens -->
                <div id="errorMessage" class="hidden mb-4 p-4 rounded-lg bg-red-100 text-red-700">
                </div>
                
                <div class="mb-8">
                    <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Login</h1>
                    <p class="text-gray-600">Digite suas credenciais para acessar</p>
                </div>

                <form id="loginForm" class="space-y-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <div class="relative">
                            <input 
                                type="email" 
                                name="email" 
                                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all duration-200 ease-in-out"
                                placeholder="seu@email.com"
                            >
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center justify-between mb-2">
                            <label class="block text-sm font-medium text-gray-700">Senha</label>
                            <a href="#" class="text-sm text-primary-600 hover:text-primary-700">Esqueceu a senha?</a>
                        </div>
                        <div class="relative">
                            <input 
                                type="password" 
                                name="password" 
                                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all duration-200 ease-in-out"
                                placeholder="••••••••"
                            >
                        </div>
                    </div>

                    <div class="flex items-center">
                        <input type="checkbox" id="remember" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded">
                        <label for="remember" class="ml-2 block text-sm text-gray-700">Lembrar-me</label>
                    </div>

                    <button 
                        type="submit" 
                        class="w-full bg-primary-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transform transition-all duration-200 ease-in-out hover:scale-[1.02] flex items-center justify-center"
                    >
                        <span id="buttonText">Entrar</span>
                        <svg id="loadingSpinner" class="animate-spin ml-2 h-5 w-5 text-white hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </button>
                </form>

                <p class="mt-6 text-center text-sm text-gray-600">
                    Não tem uma conta? 
                    <a href="#" class="font-medium text-primary-600 hover:text-primary-700">Criar conta</a>
                </p>
            </div>
        </div>
    </div>
    <script>
        window.appConfig = {
            BASE_URL: '<?php echo getenv("BASE_URL"); ?>',
            API_URL: '<?php echo getenv("API_URL"); ?>'
        };
    </script>
    <script src="<?php echo getenv('BASE_URL'); ?>/pages/auth/login/js/app.service.js"></script>
</body>
</html>
