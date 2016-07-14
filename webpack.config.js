var path = require('path');

module.exports = {
  entry: path.resolve('./src/app.js'),
  output: {
    path: path.resolve('./dist'),
    filename: "bundle.js",
    sourceMapFilename: './bundle.map'
  },
  devtool: '#source-map',
  plugins: [],
  resolve: {
    root: path.resolve('./src/')
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'mustache'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ]
  }
}
