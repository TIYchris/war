var webpack = require('webpack');

module.exports = {
  entry: "./js/app.js",
  output: {
    path: __dirname,
    filename: "js/bundle.js"
  },
  module: {
    loaders: [
      {test:/\.html$/, loader:'mustache'},
      {test: /\.json$/, loader:'json'},
      {test: /\.css$/, loader: 'style!css'},
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  }
}