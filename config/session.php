<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
require_once 'config.php';

// DICA: Se estiver em produção (Railway), verifique se o domínio do cookie de sessão está correto.

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (isset($data['usuario']) && isset($data['token'])) {
        $_SESSION['user'] = $data['usuario'];
        $_SESSION['token'] = $data['token'];
        echo json_encode(['success' => true]);
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Dados inválidos']);
    }
}
