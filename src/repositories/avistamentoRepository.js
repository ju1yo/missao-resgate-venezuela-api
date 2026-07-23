const db = require('../config/database');

function criar(avistamento) {
  const stmt = db.prepare(`
    INSERT INTO avistamentos (
      pessoa_id, data_avistamento, local_avistamento, descricao, nome_testemunha, contato_testemunha
    ) VALUES (
      @pessoa_id, @data_avistamento, @local_avistamento, @descricao, @nome_testemunha, @contato_testemunha
    )
  `);
  const info = stmt.run({
    pessoa_id: avistamento.pessoa_id,
    data_avistamento: avistamento.data_avistamento,
    local_avistamento: avistamento.local_avistamento,
    descricao: avistamento.descricao || null,
    nome_testemunha: avistamento.nome_testemunha || null,
    contato_testemunha: avistamento.contato_testemunha || null,
  });
  return buscarPorId(info.lastInsertRowid);
}

function buscarPorId(id) {
  return db.prepare('SELECT * FROM avistamentos WHERE id = ?').get(id);
}

function listar({ limit, offset, pessoaId }) {
  const whereClause = pessoaId ? 'WHERE pessoa_id = @pessoaId' : '';
  const params = pessoaId ? { pessoaId } : {};

  const total = db
    .prepare(`SELECT COUNT(*) AS total FROM avistamentos ${whereClause}`)
    .get(params).total;

  const dados = db
    .prepare(`SELECT * FROM avistamentos ${whereClause} ORDER BY data_avistamento DESC, id DESC LIMIT @limit OFFSET @offset`)
    .all({ ...params, limit, offset });

  return { total, dados };
}

function contarTotal() {
  return db.prepare('SELECT COUNT(*) AS total FROM avistamentos').get().total;
}

module.exports = { criar, buscarPorId, listar, contarTotal };
