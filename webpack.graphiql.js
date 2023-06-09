const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { transform } = require('@formatjs/ts-transformer');

const config = {
    mode: 'production',
    entry: './react/graphiql.tsx',
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        filename: 'graphiql.app.js',
    },
    devtool: 'source-map',
    resolve: {
        fallback: {
            "stream": require.resolve('stream-browserify'),
            "zlib": require.resolve('browserify-zlib'),
            "buffer": require.resolve('buffer'),
        },
        extensions: ['.mjs', '.tsx', '.ts', '.js'],
        symlinks: false,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'bba',
            inject: false,
            filename: 'autogenerated.html'
        }),
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
        // new webpack.ProvidePlugin({
        //     process: 'process/browser',
        // })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react'],
                        plugins: [
                            'formatjs',
                            '@babel/plugin-proposal-optional-chaining',
                            '@babel/plugin-proposal-nullish-coalescing-operator',
                        ]
                    }
                }
            },
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    getCustomTransformers() {
                        return {
                            before: [
                                transform({
                                    overrideIdFn: '[sha512:contenthash:base64:6]',
                                }),
                            ],
                        }
                    },
                }
            },
            {
                test: /\.json$/i,
                exclude: '/node_modules/'
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: true,
                            modules: false
                        }
                    }
                ],
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                include: /\.min\.js$/
            }),
        ],
    }
}

module.exports = config