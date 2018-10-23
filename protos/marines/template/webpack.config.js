const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ImageminWebpackPlugin } = require('imagemin-webpack');
const ImageMinGifsicle = require('imagemin-gifsicle');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const help = require( './config/helper' );

module.exports = {
  context: help.root( 'src/app' ),
  entry: ['./index.ts'],
  devtool: 'source-map',
  resolve: {
    extensions: [ '.ts', '.js', '.json', '.css', '.less', '.html', '.scss' ]
  },
  output: {
    path: help.root( 'dist' ),
    publicPath: '/',
    filename: 'js/[name].[chunkhash].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    noParse: /\/node_modules\/(jquery|lodash|moment)/,
    rules: [
      {
        test: /\.ts$/,
        loaders: [ 'awesome-typescript-loader' ],
        include: help.root( 'src/app' )
      },
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          configFile: 'tslint.json',
          tsConfigFile: 'tsconfig.json'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: false,
              removeComments: true,
              collapseWhitespace: false,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: { name: 'img/[name].[ext]' },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: { name: 'fonts/[name].[ext]' },
        }],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { sourceMap: true, publicPath: '../' },
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },

        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['*'], {
      root: path.join(__dirname, 'dist/'),
      beforeEmit: true,
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new ImageminWebpackPlugin({
      imageminOptions: {
        bail: false,
        plugins: ImageMinGifsicle({
          interlaced: true,
          optimizationLevel: 3,
        }),
      },
    }),
    new CopyWebpackPlugin([
      { from: './img/**/*.{jpg,jpeg,png,gif}', to: '' },
    ]),
    new MiniCssExtractPlugin({
      filename: 'css/[name].min.css',
      chunkFilename: 'css/[id].min.css',
    }),
    new HardSourceWebpackPlugin({
      cacheDirectory: help.root( 'node_modules' ) + '/.cache/hard-source/[confighash]',
      recordsPath: help.root( 'node_modules' ) + '/.cache/hard-source/[confighash]/records.json',
      configHash: require( 'node-object-hash' )( { sort: false } ).hash,
    })
  ]
};
