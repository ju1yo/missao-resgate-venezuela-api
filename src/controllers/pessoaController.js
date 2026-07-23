const pessoaService = require('../services/pessoaService');
const { getPagination, buildPaginatedResponse } = require('../utils/paginate');

function criar(req, res, next) {
  try {
    const pessoa = pessoaService.criarPessoa(req.body);
    res.status(201).json(pessoa);
  } catch (err) {
    next(err);
  }
}

function listar(req, res, next) {
  try {
    const paginacao = getPagination(req.query);
    const filtros = {
      nome: req.query.nome,
      status: req.query.status,
      idade_min: req.query.idade_min !== undefined ? Number(req.query.idade_min) : undefined,
      idade_max: req.query.idade_max !== undefined ? Number(req.query.idade_max) : undefined,
      local_desaparecimento: req.query.local_desaparecimento,
      data_de: req.query.data_de,
      data_ate: req.query.data_ate,
    };

    const { total, dados } = pessoaService.listarPessoas(paginacao, filtros);
    res.status(200).json(buildPaginatedResponse({ ...paginacao, total, data: dados }));
  } catch (err) {
    next(err);
  }
}

function buscarPorId(req, res, next) {
  try {
    const pessoa = pessoaService.buscarPessoaPorId(req.params.id);
    res.status(200).json(pessoa);
  } catch (err) {
    next(err);
  }
}

function atualizar(req, res, next) {
  try {
    const pessoa = pessoaService.atualizarPessoa(req.params.id, req.body);
    res.status(200).json(pessoa);
  } catch (err) {
    next(err);
  }
}

function atualizarStatus(req, res, next) {
  try {
    const pessoa = pessoaService.atualizarStatusPessoa(req.params.id, req.body);
    res.status(200).json(pessoa);
  } catch (err) {
    next(err);
  }
}

function excluir(req, res, next) {
  try {
    pessoaService.excluirPessoa(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

function listarHistoricoAvistamentos(req, res, next) {
  try {
    const paginacao = getPagination(req.query);
    const { total, dados } = pessoaService.listarHistoricoAvistamentos(req.params.id, paginacao);
    res.status(200).json(buildPaginatedResponse({ ...paginacao, total, data: dados }));
  } catch (err) {
    next(err);
  }
}

module.exports = {
  criar,
  listar,
  buscarPorId,
  atualizar,
  atualizarStatus,
  excluir,
  listarHistoricoAvistamentos,
};
