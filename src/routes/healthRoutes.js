const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    servico: 'Missão Resgate Venezuela API',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
