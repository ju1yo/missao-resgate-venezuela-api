const AppError = require('../utils/AppError');

const TIPOS_VALIDOS = ['abrigo', 'hospital', 'centro_atendimento', 'ponto_distribuicao'];

function validarCriacaoLocalApoio(body) {
  const { nome, tipo, endereco, capacidade } = body;

  if (!nome || typeof nome !== 'string' || nome.trim().length === 0) {
    throw new AppError('O campo "nome" é obrigatório.', 400);
  }
  if (!tipo || !TIPOS_VALIDOS.includes(tipo)) {
    throw new AppError(`O campo "tipo" é obrigatório. Valores aceitos: ${TIPOS_VALIDOS.join(', ')}.`, 400);
  }
  if (!endereco || typeof endereco !== 'string' || endereco.trim().length === 0) {
    throw new AppError('O campo "endereco" é obrigatório.', 400);
  }
  if (capacidade !== undefined && (Number.isNaN(Number(capacidade)) || Number(capacidade) < 0)) {
    throw new AppError('O campo "capacidade" deve ser um número positivo.', 400);
  }
}

module.exports = { TIPOS_VALIDOS, validarCriacaoLocalApoio };
