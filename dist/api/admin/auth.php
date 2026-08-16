<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// ── Banco de dados ──────────────────────────────────────────────────────────
$raiz   = rtrim($_SERVER['DOCUMENT_ROOT'], '/');
$dbDir  = $raiz . '/api/admin';
if (!is_dir($dbDir)) { mkdir($dbDir, 0755, true); }
$dbPath = $dbDir . '/biblia_auth.db';

try {
    $pdo = new PDO('sqlite:' . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'DB connection failed: ' . $e->getMessage()]);
    exit;
}

// Cria tabelas
$pdo->exec("
    CREATE TABLE IF NOT EXISTS users (
        id        INTEGER PRIMARY KEY AUTOINCREMENT,
        username  TEXT UNIQUE NOT NULL,
        password  TEXT NOT NULL,
        role      TEXT NOT NULL DEFAULT 'user',
        created_at INTEGER NOT NULL DEFAULT (strftime('%s','now'))
    );
    CREATE TABLE IF NOT EXISTS tokens (
        id         INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id    INTEGER NOT NULL,
        token      TEXT UNIQUE NOT NULL,
        expires_at INTEGER NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id)
    );
");

// Seed admin se tabela vazia
$count = $pdo->query("SELECT COUNT(*) FROM users")->fetchColumn();
if ((int)$count === 0) {
    $hash = password_hash('Meu1amor1!', PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT INTO users (username, password, role) VALUES (?, ?, 'admin')");
    $stmt->execute(['admin', $hash]);
}

// ── Helpers ─────────────────────────────────────────────────────────────────
function gerarToken(PDO $pdo, int $userId): string {
    // Remove tokens expirados do usuário
    $pdo->prepare("DELETE FROM tokens WHERE user_id = ? AND expires_at < strftime('%s','now')")->execute([$userId]);
    $token     = bin2hex(random_bytes(32));
    $expiresAt = time() + 86400;
    $pdo->prepare("INSERT INTO tokens (user_id, token, expires_at) VALUES (?, ?, ?)")
        ->execute([$userId, $token, $expiresAt]);
    return $token;
}

function verificarToken(PDO $pdo, string $token): ?array {
    $stmt = $pdo->prepare("
        SELECT u.id, u.username, u.role
        FROM tokens t
        JOIN users u ON u.id = t.user_id
        WHERE t.token = ? AND t.expires_at > strftime('%s','now')
    ");
    $stmt->execute([$token]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    return $row ?: null;
}

function tokenDoHeader(): ?string {
    $auth = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (preg_match('/^Bearer\s+(.+)$/i', $auth, $m)) {
        return trim($m[1]);
    }
    return null;
}

// ── Body ─────────────────────────────────────────────────────────────────────
$body = file_get_contents('php://input');
$data = json_decode($body, true);
if (!$data) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid JSON']);
    exit;
}

$action = $data['action'] ?? '';

// ── Actions ──────────────────────────────────────────────────────────────────
switch ($action) {

    // ── LOGIN ─────────────────────────────────────────────────────────────────
    case 'login': {
        $username = trim($data['username'] ?? '');
        $password = $data['password'] ?? '';
        if (!$username || !$password) {
            http_response_code(400);
            echo json_encode(['ok' => false, 'error' => 'Username e senha obrigatorios']);
            exit;
        }
        $stmt = $pdo->prepare("SELECT id, password, role FROM users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$user || !password_verify($password, $user['password'])) {
            http_response_code(401);
            echo json_encode(['ok' => false, 'error' => 'Credenciais invalidas']);
            exit;
        }
        $token = gerarToken($pdo, (int)$user['id']);
        echo json_encode([
            'ok'    => true,
            'token' => $token,
            'user'  => ['id' => (int)$user['id'], 'username' => $username, 'role' => $user['role']],
        ]);
        break;
    }

    // ── REGISTER ──────────────────────────────────────────────────────────────
    case 'register': {
        $username = trim($data['username'] ?? '');
        $password = $data['password'] ?? '';
        if (!$username || !$password) {
            http_response_code(400);
            echo json_encode(['ok' => false, 'error' => 'Username e senha obrigatorios']);
            exit;
        }
        if (strlen($username) < 3 || strlen($username) > 32) {
            http_response_code(400);
            echo json_encode(['ok' => false, 'error' => 'Username deve ter entre 3 e 32 caracteres']);
            exit;
        }
        if (strlen($password) < 6) {
            http_response_code(400);
            echo json_encode(['ok' => false, 'error' => 'Senha deve ter pelo menos 6 caracteres']);
            exit;
        }
        // Verifica se username já existe
        $check = $pdo->prepare("SELECT id FROM users WHERE username = ?");
        $check->execute([$username]);
        if ($check->fetch()) {
            http_response_code(409);
            echo json_encode(['ok' => false, 'error' => 'Username ja em uso']);
            exit;
        }
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $ins  = $pdo->prepare("INSERT INTO users (username, password, role) VALUES (?, ?, 'user')");
        $ins->execute([$username, $hash]);
        $userId = (int)$pdo->lastInsertId();
        $token  = gerarToken($pdo, $userId);
        echo json_encode([
            'ok'    => true,
            'token' => $token,
            'user'  => ['id' => $userId, 'username' => $username, 'role' => 'user'],
        ]);
        break;
    }

    // ── VERIFY ────────────────────────────────────────────────────────────────
    case 'verify': {
        $token = tokenDoHeader() ?? ($data['token'] ?? '');
        if (!$token) {
            http_response_code(401);
            echo json_encode(['ok' => false, 'error' => 'Token ausente']);
            exit;
        }
        $user = verificarToken($pdo, $token);
        if (!$user) {
            http_response_code(401);
            echo json_encode(['ok' => false, 'error' => 'Token invalido ou expirado']);
            exit;
        }
        echo json_encode(['ok' => true, 'user' => $user]);
        break;
    }

    // ── USERS (apenas admin) ──────────────────────────────────────────────────
    case 'users': {
        $token = tokenDoHeader();
        if (!$token) {
            http_response_code(401);
            echo json_encode(['ok' => false, 'error' => 'Token ausente']);
            exit;
        }
        $caller = verificarToken($pdo, $token);
        if (!$caller) {
            http_response_code(401);
            echo json_encode(['ok' => false, 'error' => 'Token invalido ou expirado']);
            exit;
        }
        if ($caller['role'] !== 'admin') {
            http_response_code(403);
            echo json_encode(['ok' => false, 'error' => 'Acesso restrito a administradores']);
            exit;
        }
        $rows = $pdo->query("SELECT id, username, role, created_at FROM users ORDER BY created_at ASC")->fetchAll(PDO::FETCH_ASSOC);
        // Converte id e created_at para int
        $users = array_map(function($r) {
            return ['id' => (int)$r['id'], 'username' => $r['username'], 'role' => $r['role'], 'created_at' => (int)$r['created_at']];
        }, $rows);
        echo json_encode(['ok' => true, 'users' => $users]);
        break;
    }

    // ── LOGOUT ────────────────────────────────────────────────────────────────
    case 'logout': {
        $token = tokenDoHeader();
        if ($token) {
            $pdo->prepare("DELETE FROM tokens WHERE token = ?")->execute([$token]);
        }
        echo json_encode(['ok' => true]);
        break;
    }

    default: {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Action invalida: ' . $action]);
    }
}
