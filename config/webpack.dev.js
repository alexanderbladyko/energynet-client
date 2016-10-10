'use strict';

var webpack = require('webpack');
var path = require('path');

var SRC_DIR = path.join(__dirname, '..', 'src');

module.exports = {
    debug: true,
    devtool: 'eval',
    entry: ['webpack-hot-middleware/client', '../src/index.tsx'],
    module: {
        preLoaders: [{
            test: /\.tsx?$/,
            loader: 'tslint'
        }],
        loaders: [{
            test: /\.tsx?$/,
            loaders: ['ts'],
            exclude: '/node_modules/'
        }]
    },
    output: {
        filename: 'app.js',
        path: path.join(__dirname, '..', 'build'),
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        root: SRC_DIR,
        extensions: ['', '.jsx', '.js', '.tsx', '.ts']
    }
};
