import { RequestHandler } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const proxyMiddleware: RequestHandler = createProxyMiddleware({
  target: 'http://localhost:8080',
  changeOrigin: true,
});

export default function configureProxy(app: Application) {
  app.use('/api', proxyMiddleware);
}
