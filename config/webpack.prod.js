'use strict';

var webpack = require('webpack');
var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    noInfo: true,
    entry: [
        "index.tsx"
    ],
    production: true,
    resolve: {
        root: path.resolve(path.join(__dirname, '..', 'src')),
        extensions: ["", ".ts", ".tsx", ".js", ".jsx"],
        alias: {
            "mapbox-gl": 'mapbox-gl/dist/mapbox-gl.js',
        }
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
            loaders: ['ts'],
            exclude: /node_modules/
        },
        {
           test: /\.scss$/,
           loader: 'style!css!sass',
        },
        {
            test: /\.(eot|ttf|woff|woff2)$/,
            loader: 'file?name=public/fonts/[name].[ext]'
        },
        {
            test: /.\.(gif|png|jpe?g|svg)$/,
            loaders: [
                'file?hash=sha512&digest=hex&name=[name].[hash:8].[ext]',
                'image-webpack',
            ],
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
        }),
        new HtmlWebpackPlugin({
            template: 'src/index_template.html',
            inject: false,
            production: true,
        })
    ],
    tslint: {
        emitErrors: true,
        failOnHint: true
    }
}
