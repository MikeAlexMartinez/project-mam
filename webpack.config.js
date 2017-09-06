const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: path.join(__dirname, './src/App.js'),
    fcc: path.join(__dirname, './src/Fcc.js'),
    admin: path.join(__dirname, './src/Admin.js'),
    vendor: ['react', 'react-dom', 'babel-polyfill', 'whatwg-fetch'],
  },
  output: {
    path: path.join(__dirname, './static'),
    filename: '[name].bundle.js',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js'}),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react', 'es2015'],
        },
      },
    ],
  },
  devServer: {
    port: 8000,
    contentBase: 'static',
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000',
      },
    },
    historyApiFallback: true,
  },
  devtool: 'source-map',
};
