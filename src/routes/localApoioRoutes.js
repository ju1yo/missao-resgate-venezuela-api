const express = require('express');
const localApoioController = require('../controllers/localApoioController');

const router = express.Router();

router.post('/', localApoioController.criar);
router.get('/', localApoioController.listar);
router.get('/:id', localApoioController.buscarPorId);

module.exports = router;
