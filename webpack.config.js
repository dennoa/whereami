const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
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
        use: ['style-loader', 'css-loader', 'sass-loader'],
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
    new CopyWebpackPlugin([{ from: './app/assets', to: 'assets' }]),
  ],
  devtool: 'eval',
  devServer: {
    port: 9000,
    allowedHosts: ['.thor.io', '.expensecheck.io'],
  },
}
