var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var IP = '0.0.0.0';
var PORT = process.env.PORT || 8080;
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(PORT, IP, function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Dev server listening at ',IP,PORT);
});
