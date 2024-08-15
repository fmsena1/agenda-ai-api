const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Agenda Aí API',
        description: 'Description',
    },
    host: 'localhost:4000',
    schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/routes/routes'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.js');
});
