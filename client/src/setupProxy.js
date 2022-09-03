const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/storeAPI',
    createProxyMiddleware({
      target: 'http://localhost:8000',
      changeOrigin: true,
    })
  );
  app.use(
    '/supplyAPI',
    createProxyMiddleware({
      target: 'http://localhost:7000',
      changeOrigin: true,
    })
  );
};