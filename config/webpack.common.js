// @ts-nocheck
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { fileNames } = require('../utils');

const entry = {};
const plugins = [];
for (const file of fileNames) {
  entry[file] = path.resolve(__dirname, `../src/js/${file}.ts`);
  plugins.push(
    new HtmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
      },
      chunks: [`${file}`],
      filename: `${file}.html`,
      isProdEnv: process.env.PROD || process.env.UAT,
      template: path.resolve(__dirname, `../src/${file}.ejs`),
    })
  );
}

const config = {
  entry,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].js',
    publicPath: './',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 15000,
              name: 'img/[name].[hash:4].[ext]',
              publicPath: './',
            },
          },
        ],
      },
      {
        test: /\.(tsx|ts|js)$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins,
};

module.exports = config;
