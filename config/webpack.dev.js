'use strict';

var webpack = require('webpack')
var path = require("path")

var StyleLintPlugin = require('stylelint-webpack-plugin')

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
            },
            {
               test: /\.scss$/,
               loader: 'style!css!sass',
           },
           {
               test: /.\.(gif|png|jpe?g|svg)$/,
               loaders: [
                   // FIXME: Use smart url-loader to load image to bundle
                   // (IS_PRODUCTION ? 'url-loader' : 'file?hash=sha512&digest=hex&name=[name].[hash:8].[ext]'),
                   'file?hash=sha512&digest=hex&name=[name].[hash:8].[ext]',
                   'image-webpack',
               ],
           },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new StyleLintPlugin({
            files: '**/*.scss',
            syntax: 'scss',
        })
    ]
};
