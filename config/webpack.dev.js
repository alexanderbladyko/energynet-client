'use strict';

var webpack = require('webpack');
var path = require("path");

module.exports = {
    devtool: 'source-map',
    debug: true,
    noInfo: true,
    entry: [
        "index.tsx"
    ],
    resolve: {
        root: path.resolve(path.join(__dirname, '..', 'src')),
        extensions: ["", ".ts", ".tsx", ".js", ".jsx"]
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
        loaders: [
            {
                test: /\.tsx?$/,
                loaders: ['ts'],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
