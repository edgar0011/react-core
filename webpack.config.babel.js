
/* global __dirname */
/* global process */

import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import FlowBabelWebpackPlugin from 'flow-babel-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

const debug = process.env.NODE_ENV !== 'production';


module.exports = {
  context: path.join(__dirname, 'app'),
  devtool: debug ? 'inline-sourcemap' : '',
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
  entry: './src/index.js',
  output: {
    path: `${__dirname}/dist`,
    filename: 'react-core-bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /\.css?$/,
        loader: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss?$/,
        loader: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff',
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff',
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/octet-stream',
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader',
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
      {
        // IMAGE LOADER
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        use: 'file-loader?name=images/[name].[ext]',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      { from: __dirname + '/app/src/index.html', to: __dirname + '/dist/index.html' },
    ], {
      ignore: [
        // Doesn't copy any files with a txt extension
        '*.txt',

        // Doesn't copy any file, even if they start with a dot
        // { glob: '**!/!*', dot: true }
      ],

      // By default, we only copy modified files during
      // a watch or webpack-dev-server build. Setting this
      // to `true` copies all files.
      copyUnmodified: false,
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: false,

    }),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ManifestPlugin(),
    new FlowBabelWebpackPlugin(),
  ].concat(debug ? [] : [

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({ mangle: true, sourcemap: false }),
  ]),
};
