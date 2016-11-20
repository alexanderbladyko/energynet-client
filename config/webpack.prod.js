'use strict';

var path = require('path');
var webpack = require('webpack');

var SRC_DIR = path.join(__dirname, '..', 'src');

module.exports = {
    devtool: 'source-map',
    noInfo: true,
    entry: [
        "./src/index.tsx"
    ],
    resolve: {
        root: 'src',
        extensions: ["", ".ts", ".tsx", ".js", ".jsx"],
        moduleDirectories: ['node_modules']
    },
    module: {
        preLoaders: [{
            test: /\.tsx?$/,
            loader: 'tslint'
        }],
        loaders: [{
            test: /\.tsx?$/,
            loaders: ['ts']
        }]
    },
    output: {
        path: path.resolve(path.join(__dirname, '..', 'build')),
        filename: "app.js",
        publicPath: "/"
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    ],
    tslint: {
        emitErrors: true,
        failOnHint: true
    }
}
