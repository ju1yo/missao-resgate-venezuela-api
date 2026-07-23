const localApoioService = require('../services/localApoioService');
const { getPagination, buildPaginatedResponse } = require('../utils/paginate');

function criar(req, res, next) {
  try {
    const local = localApoioService.criarLocalApoio(req.body);
    res.status(201).json(local);
  } catch (err) {
    next(err);
  }
}

function listar(req, res, next) {
  try {
    const paginacao = getPagination(req.query);
    const filtros = { tipo: req.query.tipo };
    const { total, dados } = localApoioService.listarLocaisApoio(paginacao, filtros);
    res.status(200).json(buildPaginatedResponse({ ...paginacao, total, data: dados }));
  } catch (err) {
    next(err);
  }
}

function buscarPorId(req, res, next) {
  try {
    const local = localApoioService.buscarLocalApoioPorId(req.params.id);
    res.status(200).json(local);
  } catch (err) {
    next(err);
  }
}

function estatisticas(req, res, next) {
  try {
    const dados = localApoioService.obterEstatisticasGerais();
    res.status(200).json(dados);
  } catch (err) {
    next(err);
  }
}

module.exports = { criar, listar, buscarPorId, estatisticas };
