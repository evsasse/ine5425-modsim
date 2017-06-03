var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  
  module: {
    loaders: [{
      test: /\.jsx?$/,
      use: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: [ 'style-loader', 'css-loader' ],
    }],
  },

  plugins: [
    new HtmlWebpackPlugin(),
  ],
};
