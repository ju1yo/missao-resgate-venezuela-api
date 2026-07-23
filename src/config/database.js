const path = require('path');
const fs = require('fs');
const { DatabaseSync } = require('node:sqlite');

const dbPath = process.env.DATABASE_PATH || path.join(__dirname, '..', '..', 'database', 'missao_resgate.db');

// garante que a pasta do banco existe
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// node:sqlite é o módulo SQLite nativo do Node (>=22.13 / >=23.4), sem
// necessidade de compilar nada (ao contrário do better-sqlite3).
const db = new DatabaseSync(dbPath, { enableForeignKeyConstraints: true });
db.exec('PRAGMA journal_mode = WAL;');

function migrate() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS pessoas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      idade INTEGER NOT NULL,
      sexo TEXT,
      data_desaparecimento TEXT NOT NULL,
      local_desaparecimento TEXT,
      descricao_fisica TEXT,
      foto_url TEXT,
      status TEXT NOT NULL DEFAULT 'desaparecido'
        CHECK (status IN ('desaparecido', 'encontrado_vivo', 'encontrado_falecido', 'em_verificacao')),
      nome_contato_familiar TEXT,
      telefone_contato_familiar TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS avistamentos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pessoa_id INTEGER NOT NULL,
      data_avistamento TEXT NOT NULL,
      local_avistamento TEXT NOT NULL,
      descricao TEXT,
      nome_testemunha TEXT,
      contato_testemunha TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (pessoa_id) REFERENCES pessoas(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS locais_apoio (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      tipo TEXT NOT NULL
        CHECK (tipo IN ('abrigo', 'hospital', 'centro_atendimento', 'ponto_distribuicao')),
      endereco TEXT NOT NULL,
      capacidade INTEGER,
      contato TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_pessoas_status ON pessoas(status);
    CREATE INDEX IF NOT EXISTS idx_pessoas_nome ON pessoas(nome);
    CREATE INDEX IF NOT EXISTS idx_avistamentos_pessoa_id ON avistamentos(pessoa_id);
  `);
}

migrate();

module.exports = db;
