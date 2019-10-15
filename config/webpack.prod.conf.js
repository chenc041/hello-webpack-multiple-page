const webpack = require('webpack');
const chalk = require('chalk');
const webpackMerge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const common = require('./webpack.common');
const pkg = require('../package.json');

const { ANALYZER, DEV, TEST, UAT } = process.env;

// @ts-ignore
let publicPath = `https://chenc.site/static/${pkg.name}/`;
if (DEV === 'true') {
  // @ts-ignore
  publicPath = `https://dev.chenc.site/static/${pkg.name}/`;
} else if (TEST === 'true') {
  // @ts-ignore
  publicPath = `https://test.chenc.site/static/${pkg.name}/`;
} else if (UAT === 'true') {
  // @ts-ignore
  publicPath = `https://uat.chenc.site/static/${pkg.name}/`;
}

const definePlugin = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  'process.env.DEV': JSON.stringify('true'),
  'process.env.TEST': JSON.stringify('true'),
  'process.env.UAT': JSON.stringify('true'),
  'process.env.PROD': JSON.stringify('true'),
  'process.env.LOCAL': JSON.stringify('true'),
  'process.env.PUBLICPATH': JSON.stringify(publicPath),
};

const config = {
  mode: 'production',
  devtool: 'none',
  output: {
    filename: 'js/[name].[contenthash].js',
    publicPath,
  },
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
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  stats: {
    modules: false,
    children: false,
    chunks: false,
    warnings: false,
    performance: false,
    chunkModules: false,
  },
  plugins: [
    new TerserPlugin({
      parallel: true,
      terserOptions: {
        ecma: 6,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.DEV': JSON.stringify('true'),
      'process.env.TEST': JSON.stringify('true'),
      'process.env.UAT': JSON.stringify('true'),
      ...definePlugin,
    }),
    new ProgressBarPlugin({
      // @ts-ignore
      format: `build [:bar]  ${chalk.green.bold(':percent')}`,
      clear: false,
      width: 30,
    }),
  ],
};
if (ANALYZER === 'true') {
  config.plugins.push(new BundleAnalyzerPlugin());
}

// @ts-ignore
module.exports = webpackMerge(common, config);
