const avistamentoRepository = require('../repositories/avistamentoRepository');
const pessoaRepository = require('../repositories/pessoaRepository');
const AppError = require('../utils/AppError');
const { validarCriacaoAvistamento } = require('../validators/avistamentoValidator');

function criarAvistamento(dados) {
  validarCriacaoAvistamento(dados);

  const pessoa = pessoaRepository.buscarPorId(dados.pessoa_id);
  if (!pessoa) {
    throw new AppError('Não é possível registrar avistamento: pessoa não encontrada.', 404);
  }

  return avistamentoRepository.criar(dados);
}

function listarAvistamentos({ limit, offset }, filtros) {
  return avistamentoRepository.listar({ limit, offset, pessoaId: filtros.pessoa_id });
}

module.exports = { criarAvistamento, listarAvistamentos };
