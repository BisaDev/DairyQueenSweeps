const
    webpack = require('webpack'),
    path = require('path'),
    url = require('url');
const
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
    UglifyJsPlugin = require("uglifyjs-webpack-plugin"),
    AssetsPlugin = require('assets-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const
    devMode = process.env.NODE_ENV !== 'production',
    devServerUrl = url.parse('http://localhost:3100/'),
    devUrl = 'http://dq-sweepstakes.test/';

module.exports = {
    entry: {
        app: ['./assets/js/app.js', './assets/scss/app.scss'],
    },
    output: {
        filename: devMode ? '[name].js' : '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            'babel-preset-env',
                            {
                                modules: false,
                            }
                        ]
                    ]
                }
            }
        ]
    },
    devtool: devMode? 'eval-source-map' : 'source-map',
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['dist']),
        new OptimizeCssAssetsPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new CopyWebpackPlugin([
            { from: 'assets/images', to: 'images'},
            { from: 'assets/fonts', to: 'fonts'},
        ]),
        new AssetsPlugin({
            filename: 'manifest.json',
            path: path.join(__dirname, 'dist')
        }),
        new BrowserSyncPlugin({
            host: devServerUrl.host,
            port: devServerUrl.port,
            proxy: devUrl
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: !devMode,
                uglifyOptions: {
                    mangle: true,
                    output: {
                        comments: false,
                        beautify: false,
                    },
                },
            }),
        ],
    },
};