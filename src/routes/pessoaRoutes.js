const express = require('express');
const pessoaController = require('../controllers/pessoaController');

const router = express.Router();

router.post('/', pessoaController.criar);
router.get('/', pessoaController.listar);
router.get('/:id', pessoaController.buscarPorId);
router.put('/:id', pessoaController.atualizar);
router.patch('/:id/status', pessoaController.atualizarStatus);
router.delete('/:id', pessoaController.excluir);
router.get('/:id/avistamentos', pessoaController.listarHistoricoAvistamentos);

module.exports = router;
