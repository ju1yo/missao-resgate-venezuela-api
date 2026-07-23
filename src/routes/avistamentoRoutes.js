const express = require('express');
const avistamentoController = require('../controllers/avistamentoController');

const router = express.Router();

router.post('/', avistamentoController.criar);
router.get('/', avistamentoController.listar);

module.exports = router;
