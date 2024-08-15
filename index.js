require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');

const router = require('./src/routes/routes');

const app = express();
app.use(express.json());
app.use(router);
app.use(cors());

app.listen(4000, () => {
    console.log("API RODANDO NA PORTA 4000");
});

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile));
