const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const pxToRem = require('postcss-pxtorem');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const config = require('./config');

const stage = process.env.NODE_STAGE;
const HtmlWebpackPluginData = [];
const entryData = {};
const activityEntry = config.entry;
const activityName = config.name;
const isDev = process.env.NODE_ENV === 'development';

activityEntry.forEach(function (item) {
  HtmlWebpackPluginData.push(
    new HtmlWebpackPlugin({
      filename: `${item}.html`,
      template: path.join(__dirname, `../src/${activityName}/pages/${item}/index.html`),
      chunks: [item, 'vendor']
    })
  );
  entryData[item] = path.join(__dirname, `../src/${activityName}/pages/${item}/index.js`);
})

const webpackConfig = {
  devtool: 'cleap-module-source-map',
  entry: { ...entryData
  },
  output: {
    filename: 'public/[name]_[chunkhash:8].js',
    path: path.join(__dirname, `../dist/${activityName}`),
    publicPath: isDev ? '/' : `/${activityName}/`
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      static: path.join(__dirname, `../src/${activityName}/static`),
      common: path.join(__dirname, `../src/${activityName}/common`)
    }
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(css|less)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer,
                pxToRem({
                  rootValue: 37.5,
                  propWhiteList: ['*'],
                  selectorBlackList: []
                })
              ]
            }
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }]
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              name: 'images/[name].[hash:8].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              disable: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    ...HtmlWebpackPluginData,
    new CleanWebpackPlugin(),
    new ExtractTextPlugin('public/[name]_[hash:8].css'),
    new webpack.ProvidePlugin({
      // 全局引入jquery
      $: 'jquery',
      Template7: 'template7',
      moment: 'moment'
    }),
    new webpack.DefinePlugin({
      _URL: JSON.stringify(config.api[stage]),
    })
  ],
  optimization: {
    runtimeChunk: {
      name: 'vendor'
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /(jquery|template7|moment|qs)/,
          chunks: 'all'
        },
        default: false
      }
    }
  }
}
if (isDev) {
  webpackConfig.mode = 'development';
  webpackConfig.devServer = {
    host: '127.0.0.1',
    port: 3000,
    open: true,
    contentBase: path.join(__dirname, `../dist/${activityName}`),
    overlay: {
      errors: true
    },
    publicPath: `/`,
    historyApiFallback: false
  };
}

module.exports = webpackConfig;
