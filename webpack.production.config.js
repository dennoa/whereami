const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: './app/index.js',
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
  },
  resolve: {
    alias: {
      Helpers: path.resolve(__dirname, './app/helpers/'),
      Views: path.resolve(__dirname, './app/views/'),
      Components: path.resolve(__dirname, './app/components/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // plugins: ['lodash'],
          presets: ['react', 'es2015', 'stage-2'],
        },
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'file-loader?limit=8192&name=assets/[name].[ext]?[hash]',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/index.ejs',
    }),
    new CopyWebpackPlugin([{ from: './app/assets', to: 'assets' }, { from: './server.js' }]),
    new ExtractTextPlugin('main.css'),
    new webpack.DefinePlugin({
      'process.env': {
        ENDPOINT: JSON.stringify(process.env.API_ENDPOINT_PROD),
      },
    }),
  ],
}
