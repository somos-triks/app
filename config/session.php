<?php
require_once 'config.php';
setupSessionCookieForRailway();
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['user']) && isset($input['token'])) {
        $_SESSION['user'] = $input['user'];
        $_SESSION['token'] = $input['token'];
        http_response_code(200);
        echo json_encode(['success' => true]);
        exit;
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Dados de sessão inválidos']);
        exit;
    }
}

if (isset($_GET['action']) && $_GET['action'] === 'check') {
    $authenticated = !empty($_SESSION['user']) && !empty($_SESSION['token']);
    header('Content-Type: application/json');
    echo json_encode(['authenticated' => $authenticated]);
    exit;
}
