<?php
class Router {
    private $routes = [];

    public function add($path, $controller) {
        $this->routes[$path] = ROOT_PATH . '/' . $controller;
    }

    public function run() {
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $base_path = str_replace('/index.php', '', $_SERVER['SCRIPT_NAME']);
        $uri = str_replace($base_path, '', $uri);

        if (isset($this->routes[$uri])) {
            require_once $this->routes[$uri];
            return;
        }

        // Rota não encontrada
        header("HTTP/1.0 404 Not Found");
        require_once ROOT_PATH . '/pages/404.php';
    }
}

// Inicializar router
$router = new Router();

// Definir rotas

# Autenticação
$router->add('/logout', 'config/logout.php');
$router->add('/', 'pages/home/index.php');
$router->add('/login', 'pages/auth/login/index.php');
$router->add('/registro', 'pages/auth/register/index.php');

# Admin
$router->add('/home', 'pages/home/index.php');

#Clientes
$router->add('/clientes', 'pages/clientes/index.php');


