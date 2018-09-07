const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = (_, env) => {
    const config = {
        mode: 'development',
        entry: './src/index',
        output: {
            filename: 'bundle.js',
            path: resolve(__dirname, 'build'),
        },
        module: {
            rules: [
                { test: /\.jsx?$/,
                    exclude: /node_module/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            plugins: ['@babel/plugin-syntax-class-properties', '@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties'],
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                        },
                    } },
                { test: /\.scss$/, exclude: /node_module/, use: ['style-loader', 'css-loader', 'sass-loader'] },
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
        ],
        resolve: {
            alias: {
                actions: resolve(__dirname, 'src/actions'),
                components: resolve(__dirname, 'src/components'),
                config: resolve(__dirname, 'config.js'),
                store: resolve(__dirname, 'src/store'),
                src: resolve(__dirname, 'src'),
            },
            extensions: ['.js', '.jsx'],
        },
        devServer: {
            historyApiFallback: true,
            port: 3000,
        },
        devtool: 'eval-source-map',
    };

    if (env.mode === 'production') {
        console.log('prooddd')
        config.plugins.push(
            new CopyWebpackPlugin([
                { from: 'src/pwa/' },
            ]),
        )
    }

    return config;
};
