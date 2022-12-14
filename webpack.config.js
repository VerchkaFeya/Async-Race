const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const baseConfig = {
    entry: path.resolve(__dirname, './src/index'),
    mode: 'development',
    module: {
        rules: [
            {
              test: /\.tsx?$/,
              use: 'ts-loader',
              exclude: /node_modules/,
            },
            {
                test: /\.(scss|sass|css)$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
						{
							test: /.(png|svg|jpg|jpeg|gif)$/i,
							type: 'asset',
							generator: {
								filename: 'assets/images/[name][ext]',
							}
						},
						{
							test: /\.html$/i,
							loader: "html-loader",
						}
        ],
    },
    resolve: {
        extensions: ['.js', '.ts'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
				clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
            favicon: "./src/assets/icons/favicon3.ico",
        }),
        new CleanWebpackPlugin(),
				new EslintPlugin({ extensions: 'ts' }),
				new CopyPlugin({
					patterns: [
						{ from: "./src/assets", to: "./assets" },
					],
				}),
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};
