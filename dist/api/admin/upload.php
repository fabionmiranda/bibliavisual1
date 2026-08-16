<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['ok' => false, 'error' => 'Method not allowed']); exit; }

// ── Autenticação ─────────────────────────────────────────────────────────────
function autenticarToken(): void {
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
        SELECT u.id FROM tokens t
        JOIN users u ON u.id = t.user_id
        WHERE t.token = ? AND t.expires_at > strftime('%s','now')
    ");
    $stmt->execute([$token]);
    if (!$stmt->fetch()) {
        http_response_code(401);
        echo json_encode(['ok' => false, 'error' => 'Token invalido ou expirado']);
        exit;
    }
}

autenticarToken();

// ── Upload ────────────────────────────────────────────────────────────────────
$body = file_get_contents('php://input');
$data = json_decode($body, true);
if (!$data) { http_response_code(400); echo json_encode(['ok' => false, 'error' => 'Invalid JSON']); exit; }

$testamento = basename($data['testamento'] ?? '');
$livroId    = basename($data['livroId']    ?? '');
$tipo       = $data['tipo']       ?? '';
$content    = $data['content']    ?? '';
$filename   = $data['filename']   ?? '';

$nomeArquivo = ($tipo === 'diagrama' && $filename) ? basename($filename) : $tipo . '.txt';

$raiz = rtrim($_SERVER['DOCUMENT_ROOT'], '/');
$dir  = $raiz . '/admin/' . $testamento . '/' . $livroId;

if (!is_dir($dir)) {
    mkdir($dir, 0755, true);
}

$filePath = $dir . '/' . $nomeArquivo;

$raw = base64_decode($content);
if ($raw === false) { http_response_code(400); echo json_encode(['ok' => false, 'error' => 'Invalid base64']); exit; }

if (!mb_check_encoding($raw, 'UTF-8')) {
    $raw = mb_convert_encoding($raw, 'UTF-8', 'Windows-1252');
}

$result = file_put_contents($filePath, $raw);
if ($result === false) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Falha ao gravar arquivo. Verifique permissoes da pasta admin/']);
    exit;
}

echo json_encode(['ok' => true, 'saved' => $nomeArquivo, 'path' => $dir]);
