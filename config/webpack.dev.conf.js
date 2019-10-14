// @ts-nocheck
const ip = require('ip');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const common = require('./webpack.common');

module.exports = webpackMerge(common, {
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(css|less)/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },
  // @ts-ignore
  devServer: {
    hot: true,
    port: 8090,
    open: true,
    quiet: true,
    inline: true,
    noInfo: true,
    overlay: true,
    host: ip.address(),
    publicPath: '/',
    contentBase: './dist',
    clientLogLevel: 'none',
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
      },
    },
  },
  plugins: [
    new HardSourceWebpackPlugin({
      info: {
        mode: 'none',
        level: 'debug',
      },
    }),
    new MiniCssExtractPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['You application is running here http://localhost:8090'],
        notes: ['U can build u app by yarn build or npm run build'],
      },
    }),
  ],
});
