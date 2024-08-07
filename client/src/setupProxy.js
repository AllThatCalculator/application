const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/api", "/file"],
    createProxyMiddleware({
      target: "https://allthatcalculator.net", // development server
      changeOrigin: true,
    })
  );
};
