const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const path = require('path');
const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack')

module.exports = {
    context: path.join(__dirname, 'app'),
    devtool: debug ? "inline-sourcemap" : null,
    devServer: {
      historyApiFallback: true,
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 9000
    },
    entry: "./src/index.js",
    output: {
        path: __dirname + "/dist",
        filename: "react-core-bundle.js"
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015', 'stage-0'],
            plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
          }
        },
        {
          test: /\.css?$/,
          loader: ['style-loader', 'css-loader']
        },
        {
          test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
          use: 'url-loader?limit=10000&mimetype=application/font-woff'
        }, {
          test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
          use: 'url-loader?limit=10000&mimetype=application/font-woff'
        }, {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          use: 'url-loader?limit=10000&mimetype=application/octet-stream'
        }, {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          use: 'file-loader'
        }, {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          use: 'url-loader?limit=10000&mimetype=image/svg+xml'
        }
      ]
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
                //{ glob: '**!/!*', dot: true }
            ],

            // By default, we only copy modified files during
            // a watch or webpack-dev-server build. Setting this
            // to `true` copies all files.
            copyUnmodified: false
        }),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        minify:false

      }),
      new webpack.NamedModulesPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin()
    ].concat(debug ? [] : [

      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({ mangle: true, sourcemap: false })
    ])
};