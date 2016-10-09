var path = require('path');
var webpack = require('webpack');

var SRC_DIR = path.join(__dirname, '..', 'src');

module.exports = {
    devtool: 'source-map',
    entry: './src/index.tsx',
    module: {
        preLoaders: [{
            test: /\.tsx?$/,
            loader: 'tslint',
            include: SRC_DIR
        }],
        loaders: [{
            test: /\.tsx?$/,
            loaders: ['babel', 'ts'],
            include: SRC_DIR
        }]
    },
    output: {
        path: path.join(__dirname, '..', 'build'),
        filename: 'app.js',
        publicPath: '/static/'
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
    resolve: {
        root: [SRC_DIR],
        extensions: ['', '.jsx', '.js', '.tsx', '.ts']
    },
    tslint: {
        emitErrors: true,
        failOnHint: true
    }
}
