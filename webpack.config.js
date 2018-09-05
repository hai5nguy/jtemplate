const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = () => {
    const config = {
        mode: 'development',
        entry: './src/index',
        output: {
            filename: 'bundle.js',
            path: resolve(__dirname, 'build'),
        },
        module: {
            rules: [
                { test: /\.jsx?$/, exclude: /node_module/, loader: 'babel-loader' },
                { test: /\.scss$/, exclude: /node_module/, use: ['style-loader', 'css-loader', 'sass-loader'] },
                { test: /\.png$/, include: /pwa/, use: ['file-loader?name=[name].[ext]'] },
                {
                    type: 'javascript/auto',
                    test: [
                        resolve(__dirname, 'src/pwa/'),
                    ],
                    use: ['file-loader?name=[name].[ext]'],
                },

            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'src/index.html',
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
                'process.env.API_URL': JSON.stringify(process.env.API_URL || 'http://localhost:9001/graphql'),
            }),
            new CopyWebpackPlugin([
                { from: 'src/pwa/' },
            ]),
        ],
        resolve: {
            alias: {
                _Styles: resolve(__dirname, 'src/_Styles'),
                Actions: resolve(__dirname, 'src/Actions'),
                components: resolve(__dirname, 'src/components'),
                config: resolve(__dirname, 'config.js'),
                Store: resolve(__dirname, 'src/Store'),
                src: resolve(__dirname, 'src'),
            },
        },
        devServer: {
            historyApiFallback: true,
            port: 3000,
        },
        devtool: 'eval-source-map',
    };

    return config;
};
