const AppError = require('../utils/AppError');

const STATUS_VALIDOS = ['desaparecido', 'encontrado_vivo', 'encontrado_falecido', 'em_verificacao'];

function isDataValida(data) {
  if (typeof data !== 'string') return false;
  const d = new Date(data);
  return !Number.isNaN(d.getTime());
}

function validarCriacaoPessoa(body) {
  const { nome, idade, data_desaparecimento, status } = body;

  if (!nome || typeof nome !== 'string' || nome.trim().length === 0) {
    throw new AppError('O campo "nome" é obrigatório e não pode ser vazio.', 400);
  }

  if (idade === undefined || idade === null || Number.isNaN(Number(idade))) {
    throw new AppError('O campo "idade" é obrigatório e deve ser numérico.', 400);
  }
  if (Number(idade) < 0) {
    throw new AppError('A idade não pode ser negativa.', 400);
  }
  if (Number(idade) > 120) {
    throw new AppError('A idade não pode ser maior que 120.', 400);
  }

  if (!data_desaparecimento || !isDataValida(data_desaparecimento)) {
    throw new AppError('O campo "data_desaparecimento" é obrigatório e deve ser uma data válida (AAAA-MM-DD).', 400);
  }

  if (status !== undefined && !STATUS_VALIDOS.includes(status)) {
    throw new AppError(`Status inválido. Valores aceitos: ${STATUS_VALIDOS.join(', ')}.`, 400);
  }
}

function validarAtualizacaoPessoa(body) {
  const { idade, data_desaparecimento, status, nome } = body;

  if (nome !== undefined && (typeof nome !== 'string' || nome.trim().length === 0)) {
    throw new AppError('O campo "nome" não pode ser vazio.', 400);
  }
  if (idade !== undefined) {
    if (Number.isNaN(Number(idade))) throw new AppError('A idade deve ser numérica.', 400);
    if (Number(idade) < 0) throw new AppError('A idade não pode ser negativa.', 400);
    if (Number(idade) > 120) throw new AppError('A idade não pode ser maior que 120.', 400);
  }
  if (data_desaparecimento !== undefined && !isDataValida(data_desaparecimento)) {
    throw new AppError('Data de desaparecimento inválida.', 400);
  }
  if (status !== undefined && !STATUS_VALIDOS.includes(status)) {
    throw new AppError(`Status inválido. Valores aceitos: ${STATUS_VALIDOS.join(', ')}.`, 400);
  }
}

function validarStatus(body) {
  const { status } = body;
  if (!status || !STATUS_VALIDOS.includes(status)) {
    throw new AppError(`Status inválido. Valores aceitos: ${STATUS_VALIDOS.join(', ')}.`, 400);
  }
}

module.exports = {
  STATUS_VALIDOS,
  validarCriacaoPessoa,
  validarAtualizacaoPessoa,
  validarStatus,
};
