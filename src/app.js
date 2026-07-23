const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const healthRoutes = require('./routes/healthRoutes');
const pessoaRoutes = require('./routes/pessoaRoutes');
const avistamentoRoutes = require('./routes/avistamentoRoutes');
const localApoioRoutes = require('./routes/localApoioRoutes');
const localApoioController = require('./controllers/localApoioController');
const { errorHandler, notFoundHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Documentação Swagger/OpenAPI
const swaggerDocument = YAML.load(path.join(__dirname, '..', 'docs', 'openapi.yaml'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas
app.use('/health', healthRoutes);
app.use('/api/pessoas', pessoaRoutes);
app.use('/api/avistamentos', avistamentoRoutes);
app.use('/api/locais-apoio', localApoioRoutes);
app.get('/api/estatisticas', localApoioController.estatisticas);

// 404 e tratamento centralizado de erros
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
