const { createProxyMiddleware } = require("http-proxy-middleware");

//proxy request of localhost:3000/api to http://localhost:8000/api
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://young-hamlet-61577.herokuapp.com",
      changeOrigin: true,
    })
  );
};
