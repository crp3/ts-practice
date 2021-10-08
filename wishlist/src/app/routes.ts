import restify from 'restify';
import { Router } from 'restify-router';
import * as controllers from './controllers/index';
import { swagger } from './swagger';

const router = new Router();
const server = restify.createServer();

swagger(server);
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

router.get('/health', controllers.health);

router.applyRoutes(server);

export default server;
