import { Request, Response, Next } from 'restify';

export default (req: Request, res: Response, next: Next) => {
  res.send(200, 'Service is up');
  return next();
}
