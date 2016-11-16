'use strict';

var webpack = require('webpack');
var path = require("path");


var config = {
    debug: true,
    entry: [
        "./src/index.tsx"
    ],
    output: {
        path: path.resolve(path.join(__dirname, '..', 'build')),
        filename: "app.js",
        publicPath: "/"
    },
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
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        preLoaders: [{
            test: /\.tsx?$/,
            loader: 'tslint'
        }],
        loaders: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
                exclude: /node_modules/
            }
        ]
    }
};

module.exports = config;
