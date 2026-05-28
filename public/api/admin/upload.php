<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['ok' => false, 'error' => 'Method not allowed']); exit; }

$body = file_get_contents('php://input');
$data = json_decode($body, true);
if (!$data) { http_response_code(400); echo json_encode(['ok' => false, 'error' => 'Invalid JSON']); exit; }

$testamento = basename($data['testamento'] ?? '');
$livroId    = basename($data['livroId']    ?? '');
$tipo       = $data['tipo']       ?? '';
$content    = $data['content']    ?? '';
$filename   = $data['filename']   ?? '';

$nomeArquivo = ($tipo === 'diagrama' && $filename) ? basename($filename) : $tipo . '.txt';

// DOCUMENT_ROOT aponta sempre para a raiz do domínio/subdomínio
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
