<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') { http_response_code(405); echo json_encode(['ok' => false, 'error' => 'Method not allowed']); exit; }

// ── Autenticação + autorização (somente admin) ────────────────────────────────
function autenticarAdmin(): void {
    $auth = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (!preg_match('/^Bearer\s+(.+)$/i', $auth, $m)) {
        http_response_code(401);
        echo json_encode(['ok' => false, 'error' => 'Token ausente']);
        exit;
    }
    $token = trim($m[1]);

    $raiz   = rtrim($_SERVER['DOCUMENT_ROOT'], '/');
    $dbPath = $raiz . '/api/admin/biblia_auth.db';
    if (!file_exists($dbPath)) {
        http_response_code(401);
        echo json_encode(['ok' => false, 'error' => 'Token invalido']);
        exit;
    }
    try {
        $pdo = new PDO('sqlite:' . $dbPath);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['ok' => false, 'error' => 'DB error']);
        exit;
    }
    $stmt = $pdo->prepare("
        SELECT u.role FROM tokens t
        JOIN users u ON u.id = t.user_id
        WHERE t.token = ? AND t.expires_at > strftime('%s','now')
    ");
    $stmt->execute([$token]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$row) {
        http_response_code(401);
        echo json_encode(['ok' => false, 'error' => 'Token invalido ou expirado']);
        exit;
    }
    if ($row['role'] !== 'admin') {
        http_response_code(403);
        echo json_encode(['ok' => false, 'error' => 'Acesso restrito a administradores']);
        exit;
    }
}

autenticarAdmin();

// ── Delete ────────────────────────────────────────────────────────────────────
$body = file_get_contents('php://input');
$data = json_decode($body, true);
if (!$data) { http_response_code(400); echo json_encode(['ok' => false, 'error' => 'Invalid JSON']); exit; }

$testamento = basename($data['testamento'] ?? '');
$livroId    = basename($data['livroId']    ?? '');
$filename   = basename($data['filename']  ?? '');

$raiz     = rtrim($_SERVER['DOCUMENT_ROOT'], '/');
$filePath = $raiz . '/admin/' . $testamento . '/' . $livroId . '/' . $filename;

if (file_exists($filePath)) {
    unlink($filePath);
}

echo json_encode(['ok' => true]);
