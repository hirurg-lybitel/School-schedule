import webpack from 'webpack';
import resolve from './resolve';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration as WebpackConfiguration } from 'webpack';

const config: WebpackConfiguration = {
    mode: 'production',
    entry: './src/index.tsx',
    output: {
        path: '/dist',
        filename: 'js/bundle.[contenthash].min.js',
        publicPath: '/',
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                    },
                },
            },
        ],
    },
    resolve,
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
};

export default config;
