const db = require('../config/database');

function criar(local) {
  const stmt = db.prepare(`
    INSERT INTO locais_apoio (nome, tipo, endereco, capacidade, contato)
    VALUES (@nome, @tipo, @endereco, @capacidade, @contato)
  `);
  const info = stmt.run({
    nome: local.nome,
    tipo: local.tipo,
    endereco: local.endereco,
    capacidade: local.capacidade !== undefined ? Number(local.capacidade) : null,
    contato: local.contato || null,
  });
  return buscarPorId(info.lastInsertRowid);
}

function buscarPorId(id) {
  return db.prepare('SELECT * FROM locais_apoio WHERE id = ?').get(id);
}

function listar({ limit, offset, tipo }) {
  const whereClause = tipo ? 'WHERE tipo = @tipo' : '';
  const params = tipo ? { tipo } : {};

  const total = db
    .prepare(`SELECT COUNT(*) AS total FROM locais_apoio ${whereClause}`)
    .get(params).total;

  const dados = db
    .prepare(`SELECT * FROM locais_apoio ${whereClause} ORDER BY id DESC LIMIT @limit OFFSET @offset`)
    .all({ ...params, limit, offset });

  return { total, dados };
}

function contarTotal() {
  return db.prepare('SELECT COUNT(*) AS total FROM locais_apoio').get().total;
}

module.exports = { criar, buscarPorId, listar, contarTotal };
