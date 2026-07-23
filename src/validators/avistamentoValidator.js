const AppError = require('../utils/AppError');

function isDataValida(data) {
  if (typeof data !== 'string') return false;
  const d = new Date(data);
  return !Number.isNaN(d.getTime());
}

function validarCriacaoAvistamento(body) {
  const { pessoa_id, data_avistamento, local_avistamento } = body;

  if (pessoa_id === undefined || pessoa_id === null || Number.isNaN(Number(pessoa_id))) {
    throw new AppError('O campo "pessoa_id" é obrigatório e deve ser numérico.', 400);
  }
  if (!data_avistamento || !isDataValida(data_avistamento)) {
    throw new AppError('O campo "data_avistamento" é obrigatório e deve ser uma data válida.', 400);
  }
  if (!local_avistamento || typeof local_avistamento !== 'string' || local_avistamento.trim().length === 0) {
    throw new AppError('O campo "local_avistamento" é obrigatório.', 400);
  }
}

module.exports = { validarCriacaoAvistamento };
