<?php require_once dirname(__DIR__) . '/config/config.php'; ?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Página não encontrada</title>
    <link href="<?php echo getenv('BASE_URL'); ?>/assets/css/output.css" rel="stylesheet">
</head>
<body class="bg-gray-50 min-h-screen flex items-center justify-center">
    <div class="text-center">
        <h1 class="text-6xl font-bold text-primary-500">404</h1>
        <p class="mt-4 text-gray-600">Página não encontrada</p>
        <a href="<?php echo getenv('BASE_URL'); ?>" class="mt-4 inline-block text-primary-600 hover:text-primary-700">
            Voltar para home
        </a>
    </div>
</body>
</html>
