const path = require('path')
const webpack = require("webpack")
const webpackMerge = require('webpack-merge')
const BabiliPlugin = require('babili-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');


let base = {
  plugins:[
    new ExtractTextPlugin("[name].css")
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.prod.js',
      'static': path.resolve(__dirname, '../static')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: false
  },
  performance: {
    hints: false
  },
  devtool: false
  // devtool: '#eval-source-map'
};
let ENV = process.env.NODE_ENV;//此处变量可由命令行传入
if (ENV.indexOf('wln') >= 0) {
    base = webpackMerge(base, {
      entry: './src/' + ENV + '/main.js',
      output: {
        publicPath: '/',
        path: path.resolve(__dirname, './static'),
        filename: ENV + '.js',
        libraryTarget: 'window'
      },
      plugins:[
        new BabiliPlugin()
      ]
    });
}
if (ENV == 'dev') {
    base = webpackMerge(base, {  
      entry: './example/main.js',
      devtool: '#eval-source-map',
      output: {
        filename: 'example.js',
      },
      plugins:[
        new htmlWebpackPlugin({'title':'example','template':'./example/wln.html'})
      ]
    });
}
module.exports = base;