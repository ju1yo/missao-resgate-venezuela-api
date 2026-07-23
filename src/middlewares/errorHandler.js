const AppError = require('../utils/AppError');

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Erro interno do servidor.';

  // Erros de constraint do SQLite viram 409 (conflito) em vez de 500
  if (err.code && String(err.code).startsWith('SQLITE_CONSTRAINT')) {
    statusCode = 409;
    message = 'Conflito de dados: violação de restrição no banco de dados.';
  }

  if (!(err instanceof AppError) && statusCode === 500) {
    // Nunca vazamos detalhes internos do servidor para quem consome a API
    console.error('[ERRO NÃO TRATADO]', err);
    message = 'Erro interno do servidor.';
  }

  res.status(statusCode).json({
    erro: message,
    status: statusCode,
  });
}

function notFoundHandler(req, res) {
  res.status(404).json({
    erro: `Rota não encontrada: ${req.method} ${req.originalUrl}`,
    status: 404,
  });
}

module.exports = { errorHandler, notFoundHandler };
