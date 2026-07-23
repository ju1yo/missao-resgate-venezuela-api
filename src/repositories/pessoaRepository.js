const db = require('../config/database');

function criar(pessoa) {
  const stmt = db.prepare(`
    INSERT INTO pessoas (
      nome, idade, sexo, data_desaparecimento, local_desaparecimento,
      descricao_fisica, foto_url, status, nome_contato_familiar, telefone_contato_familiar
    ) VALUES (
      @nome, @idade, @sexo, @data_desaparecimento, @local_desaparecimento,
      @descricao_fisica, @foto_url, @status, @nome_contato_familiar, @telefone_contato_familiar
    )
  `);
  const info = stmt.run({
    nome: pessoa.nome,
    idade: pessoa.idade,
    sexo: pessoa.sexo || null,
    data_desaparecimento: pessoa.data_desaparecimento,
    local_desaparecimento: pessoa.local_desaparecimento || null,
    descricao_fisica: pessoa.descricao_fisica || null,
    foto_url: pessoa.foto_url || null,
    status: pessoa.status || 'desaparecido',
    nome_contato_familiar: pessoa.nome_contato_familiar || null,
    telefone_contato_familiar: pessoa.telefone_contato_familiar || null,
  });
  return buscarPorId(info.lastInsertRowid);
}

function buscarPorId(id) {
  return db.prepare('SELECT * FROM pessoas WHERE id = ?').get(id);
}

function listar({ limit, offset, filtros }) {
  const condicoes = [];
  const params = {};

  if (filtros.nome) {
    condicoes.push('nome LIKE @nome');
    params.nome = `%${filtros.nome}%`;
  }
  if (filtros.status) {
    condicoes.push('status = @status');
    params.status = filtros.status;
  }
  if (filtros.idade_min !== undefined) {
    condicoes.push('idade >= @idade_min');
    params.idade_min = filtros.idade_min;
  }
  if (filtros.idade_max !== undefined) {
    condicoes.push('idade <= @idade_max');
    params.idade_max = filtros.idade_max;
  }
  if (filtros.local_desaparecimento) {
    condicoes.push('local_desaparecimento LIKE @local_desaparecimento');
    params.local_desaparecimento = `%${filtros.local_desaparecimento}%`;
  }
  if (filtros.data_de) {
    condicoes.push('data_desaparecimento >= @data_de');
    params.data_de = filtros.data_de;
  }
  if (filtros.data_ate) {
    condicoes.push('data_desaparecimento <= @data_ate');
    params.data_ate = filtros.data_ate;
  }

  const whereClause = condicoes.length ? `WHERE ${condicoes.join(' AND ')}` : '';

  const total = db
    .prepare(`SELECT COUNT(*) AS total FROM pessoas ${whereClause}`)
    .get(params).total;

  const dados = db
    .prepare(`SELECT * FROM pessoas ${whereClause} ORDER BY id DESC LIMIT @limit OFFSET @offset`)
    .all({ ...params, limit, offset });

  return { total, dados };
}

function atualizar(id, dadosAtualizados) {
  const pessoaAtual = buscarPorId(id);
  if (!pessoaAtual) return null;

  const camposPermitidos = [
    'nome', 'idade', 'sexo', 'data_desaparecimento', 'local_desaparecimento',
    'descricao_fisica', 'foto_url', 'status', 'nome_contato_familiar', 'telefone_contato_familiar',
  ];

  const merged = { ...pessoaAtual };
  camposPermitidos.forEach((campo) => {
    if (dadosAtualizados[campo] !== undefined) merged[campo] = dadosAtualizados[campo];
  });

  db.prepare(`
    UPDATE pessoas SET
      nome = @nome, idade = @idade, sexo = @sexo, data_desaparecimento = @data_desaparecimento,
      local_desaparecimento = @local_desaparecimento, descricao_fisica = @descricao_fisica,
      foto_url = @foto_url, status = @status, nome_contato_familiar = @nome_contato_familiar,
      telefone_contato_familiar = @telefone_contato_familiar, updated_at = datetime('now')
    WHERE id = @id
  `).run({ ...merged, id });

  return buscarPorId(id);
}

function atualizarStatus(id, status) {
  const pessoa = buscarPorId(id);
  if (!pessoa) return null;
  db.prepare("UPDATE pessoas SET status = ?, updated_at = datetime('now') WHERE id = ?").run(status, id);
  return buscarPorId(id);
}

function excluir(id) {
  const pessoa = buscarPorId(id);
  if (!pessoa) return false;
  db.prepare('DELETE FROM pessoas WHERE id = ?').run(id);
  return true;
}

function contarPorStatus() {
  return db.prepare('SELECT status, COUNT(*) AS total FROM pessoas GROUP BY status').all();
}

function contarTotal() {
  return db.prepare('SELECT COUNT(*) AS total FROM pessoas').get().total;
}

module.exports = {
  criar,
  buscarPorId,
  listar,
  atualizar,
  atualizarStatus,
  excluir,
  contarPorStatus,
  contarTotal,
};
