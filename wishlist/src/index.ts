import server from './app/routes';
import config from './config/index';
import { logger }  from './monitoring/index'

const port = config.PORT;

server.listen(port, () => logger.info(`Server is running on ${port}`));
