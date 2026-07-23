const localApoioRepository = require('../repositories/localApoioRepository');
const pessoaRepository = require('../repositories/pessoaRepository');
const avistamentoRepository = require('../repositories/avistamentoRepository');
const AppError = require('../utils/AppError');
const { validarCriacaoLocalApoio } = require('../validators/localApoioValidator');

function criarLocalApoio(dados) {
  validarCriacaoLocalApoio(dados);
  return localApoioRepository.criar(dados);
}

function buscarLocalApoioPorId(id) {
  const local = localApoioRepository.buscarPorId(id);
  if (!local) throw new AppError('Local de apoio não encontrado.', 404);
  return local;
}

function listarLocaisApoio({ limit, offset }, filtros) {
  return localApoioRepository.listar({ limit, offset, tipo: filtros.tipo });
}

function obterEstatisticasGerais() {
  const totalPessoas = pessoaRepository.contarTotal();
  const pessoasPorStatus = pessoaRepository.contarPorStatus();
  const totalAvistamentos = avistamentoRepository.contarTotal();
  const totalLocaisApoio = localApoioRepository.contarTotal();

  const resumoStatus = pessoasPorStatus.reduce((acc, item) => {
    acc[item.status] = item.total;
    return acc;
  }, {});

  return {
    total_pessoas_cadastradas: totalPessoas,
    pessoas_por_status: resumoStatus,
    total_avistamentos_registrados: totalAvistamentos,
    total_locais_apoio_cadastrados: totalLocaisApoio,
  };
}

module.exports = {
  criarLocalApoio,
  buscarLocalApoioPorId,
  listarLocaisApoio,
  obterEstatisticasGerais,
};
