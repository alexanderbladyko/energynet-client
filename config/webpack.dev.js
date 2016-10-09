var webpack = require('webpack');
var path = require('path');

var SRC_DIR = path.join(__dirname, '..', 'src');

module.exports = {
    debug: true,
    devtool: 'eval',
    entry: ['webpack-hot-middleware/client', './src/index.tsx'],
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
        filename: 'app.js',
        path: path.join(__dirname, '..', 'build'),
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        root: [SRC_DIR],
        extensions: ['', '.jsx', '.js', '.tsx', '.ts']
    },
    typescriptPreprocessor: {
        // options passed to typescript compiler
        tsconfigPath: './tsconfig.json', // *obligatory
        compilerOptions: { // *optional
            removeComments: false
        },
        // Options passed to gulp-sourcemaps to create sourcemaps
        sourcemapOptions: {includeContent: true, sourceRoot: '/src'},
        // ignore all files that ends with .d.ts (this files will not be served)
        ignorePath: function(path){ 
            return /\.d\.ts$/.test(path);
        },
        // transforming the filenames
        // you can pass more than one, they will be execute in order
        transformPath: [function(path) { // *optional
            return path.replace(/\.ts$/, '.js');
        }, function(path) {
            return path.replace(/[\/\\]test[\/\\]/i, '/'); // remove directory test and change to /
        }]
    }
};
