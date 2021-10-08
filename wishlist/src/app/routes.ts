import restify from 'restify';
import { Router } from 'restify-router';
import * as controllers from './controllers/index';

const router = new Router();
const server = restify.createServer();

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

router.get('/health', controllers.health);

router.applyRoutes(server);

export default server;
