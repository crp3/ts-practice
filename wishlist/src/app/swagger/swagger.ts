import restify from 'restify';

import swaggerDocument from './swagger.json';

const swaggerUi = require('swagger-ui-restify');

const docPath = '/swagger';

const options = ({ baseURL: docPath, customfavIcon: 'swagger/favicon-32x32.png' });

export default (server: restify.Server) => {
  server.get(`${docPath}/*`, ...swaggerUi.serve);
  server.get(docPath, swaggerUi.setup(swaggerDocument, options))
}
