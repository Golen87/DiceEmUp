const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: ['./src/game.ts'],
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$|\.jsx?$/,
        include: path.join(__dirname, '../src'),
        loader: 'ts-loader'
      },
      {
        test: /\.(gif|png|jpe?g|svg|xml|ogg|mp3|wav|mpe?g|woff(2)?)$/i,
        use: "file-loader"
      },
      {
        test: /\.mp4$/,
        use: 'file-loader?name=videos/[name].[ext]',
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          filename: '[name].bundle.js'
        }
      }
    }
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'pwa', to: '' },
        { from: 'static' },
        // { from: 'src/assets', to: 'assets' },
        { from: 'src/style.css' },
      ]
    }),
    new InjectManifest({
      swSrc: path.resolve(__dirname, '../pwa/sw.js'),
      swDest: 'sw.js'
    })
  ]
};
