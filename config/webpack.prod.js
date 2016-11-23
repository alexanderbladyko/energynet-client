'use strict';

var webpack = require('webpack');
var path = require('path');


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
    resolveLoader: {
        moduleDirectories: [
            'node_modules'
        ]
    },
    output: {
        path: path.resolve(path.join(__dirname, '..', 'build')),
        filename: "app.js",
        publicPath: "/"
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
