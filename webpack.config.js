const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const devMode = process.env.NODE_ENV === 'development';

const filename = (ext) => (devMode ? `[name].${ext}` : `[name].[hash].${ext}`);

module.exports = {
  context: path.resolve(__dirname, './src'),
  mode: 'development',
  entry: {
    main: './index.js',
    analytics: './analitycs.js',
  },
  output: {
    filename: filename('js'),
    assetModuleFilename: 'assets/images/[hash][ext]',
    path: path.resolve(__dirname, './dist/'),
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@models': path.resolve(__dirname, './src/models'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [].concat(
    devMode
      ? []
      : [
          new HtmlWebpackPlugin({
            template: './index.html',
          }),
          new CleanWebpackPlugin(),
          new CopyWebpackPlugin({
            patterns: [
              {
                from: path.resolve(__dirname, './src/favicon.ico'),
                to: path.resolve(__dirname, 'dist'),
              },
            ],
          }),
          new MiniCssExtractPlugin({
            filename: filename('css'),
          }),
        ]
  ),
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },
      { test: /\.html$/i, loader: 'html-loader' },
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
      { test: /\.xml$/i, type: 'asset/resource' },
      { test: /\.csv$/i, type: 'asset/resource' },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugin({
        extractComments: {
          condition: /^\**!|@preserve|@license|@cc_on/i,
          filename: (fileData) => {
            return `${fileData.filename}.LICENSE.txt${fileData.query}`;
          },
          banner: (licenseFile) => {
            return `License information can be found in ${licenseFile}`;
          },
        },
      }),
    ],
    minimize: true,
  },
  devServer: {
    port: 4202,
    watchFiles: ['./src/*'],
    open: true,
  },
};
