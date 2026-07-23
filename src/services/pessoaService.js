const pessoaRepository = require('../repositories/pessoaRepository');
const avistamentoRepository = require('../repositories/avistamentoRepository');
const AppError = require('../utils/AppError');
const {
  validarCriacaoPessoa,
  validarAtualizacaoPessoa,
  validarStatus,
} = require('../validators/pessoaValidator');

function criarPessoa(dados) {
  validarCriacaoPessoa(dados);
  return pessoaRepository.criar(dados);
}

function buscarPessoaPorId(id) {
  const pessoa = pessoaRepository.buscarPorId(id);
  if (!pessoa) throw new AppError('Pessoa não encontrada.', 404);
  return pessoa;
}

function listarPessoas({ page, limit, offset }, filtros) {
  return pessoaRepository.listar({ limit, offset, filtros });
}

function atualizarPessoa(id, dados) {
  buscarPessoaPorId(id); // garante 404 se não existir
  validarAtualizacaoPessoa(dados);
  return pessoaRepository.atualizar(id, dados);
}

function atualizarStatusPessoa(id, dados) {
  buscarPessoaPorId(id);
  validarStatus(dados);
  return pessoaRepository.atualizarStatus(id, dados.status);
}

function excluirPessoa(id) {
  buscarPessoaPorId(id);
  return pessoaRepository.excluir(id);
}

function listarHistoricoAvistamentos(id, { limit, offset }) {
  buscarPessoaPorId(id);
  return avistamentoRepository.listar({ limit, offset, pessoaId: id });
}

module.exports = {
  criarPessoa,
  buscarPessoaPorId,
  listarPessoas,
  atualizarPessoa,
  atualizarStatusPessoa,
  excluirPessoa,
  listarHistoricoAvistamentos,
};
