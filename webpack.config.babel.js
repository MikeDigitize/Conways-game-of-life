import 'babel-core/register';
import { resolve, join } from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';

let webpackPlugins = [
    new HtmlWebpackPlugin({
        template: './src/index.html'
    }), 
    new ExtractTextPlugin('bundle.css'),
    new CopyWebpackPlugin([{
        context: './src',
        from: '**/*.css',
        to: './'
    }]),
    new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessorOptions: { discardComments: { removeAll: true } }
    })
];

if(process.env.NODE_ENV === 'production') {
    webpackPlugins.push(
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production')
          }
        })
    );
}

module.exports = {
    devtool: 'source-map',
    devServer: {
        contentBase: join(__dirname, 'build'),
        compress: true,
        port: 9000
    },
    entry: {
        'js/app': 'app.js'
    },
    resolve: {
        modules: [
            join(__dirname, 'src'),
            'node_modules'
        ],
        extensions: ['.js']
    },
    output: {
        path: resolve(`${__dirname}/build`),
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader : 'babel-loader'
            }            
        }]
    },
    plugins: webpackPlugins,
    watch : true
};