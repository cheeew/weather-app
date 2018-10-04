const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { 
              loader: 'css-loader', options: { minimize: true } 
            }
          ]
        }),
      }
    ]
  },
  plugins: [ 
    new Dotenv(),
    new HtmlWebpackPlugin({
      // injects bundle.js to our new index.html
      inject: true,
      // copys the content of the existing index.html to /dist index.html
      template:  path.resolve('./index.html'),
    }),
    new ExtractTextPlugin({filename: 'styles.css'}),
  ],
};