require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Missão Resgate Venezuela API rodando na porta ${PORT}`);
  console.log(`Documentação disponível em http://localhost:${PORT}/docs`);
});
