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

$testamento = $data['testamento'] ?? '';
$livroId    = $data['livroId']    ?? '';
$tipo       = $data['tipo']       ?? '';
$content    = $data['content']    ?? '';
$filename   = $data['filename']   ?? '';

// Sanitiza entradas para evitar path traversal
$testamento = basename($testamento);
$livroId    = basename($livroId);

$nomeArquivo = ($tipo === 'diagrama' && $filename) ? basename($filename) : $tipo . '.txt';

// Caminho base: dois níveis acima deste script (api/admin/) até a raiz, depois admin/
$raiz = dirname(dirname(dirname(__FILE__)));
$dir  = $raiz . '/admin/' . $testamento . '/' . $livroId;

if (!is_dir($dir)) {
    mkdir($dir, 0755, true);
}

$filePath = $dir . '/' . $nomeArquivo;

// Decodifica base64
$raw = base64_decode($content);
if ($raw === false) { http_response_code(400); echo json_encode(['ok' => false, 'error' => 'Invalid base64']); exit; }

// Detecta encoding: tenta UTF-8 válido, senão converte de Windows-1252
if (!mb_check_encoding($raw, 'UTF-8')) {
    $raw = mb_convert_encoding($raw, 'UTF-8', 'Windows-1252');
}

file_put_contents($filePath, $raw);
echo json_encode(['ok' => true, 'saved' => $nomeArquivo]);
