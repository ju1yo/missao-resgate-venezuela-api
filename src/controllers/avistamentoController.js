const avistamentoService = require('../services/avistamentoService');
const { getPagination, buildPaginatedResponse } = require('../utils/paginate');

function criar(req, res, next) {
  try {
    const avistamento = avistamentoService.criarAvistamento(req.body);
    res.status(201).json(avistamento);
  } catch (err) {
    next(err);
  }
}

function listar(req, res, next) {
  try {
    const paginacao = getPagination(req.query);
    const filtros = { pessoa_id: req.query.pessoa_id };
    const { total, dados } = avistamentoService.listarAvistamentos(paginacao, filtros);
    res.status(200).json(buildPaginatedResponse({ ...paginacao, total, data: dados }));
  } catch (err) {
    next(err);
  }
}

module.exports = { criar, listar };
