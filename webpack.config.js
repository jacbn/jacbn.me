/* eslint-disable */

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");

module.exports = {
    entry: [
        path.join(__dirname, "src", "index.tsx"), 
    ],
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".css"],
        alias: {
            '@': path.resolve('src'),
        },
    },
    output: { 
        path: path.resolve(__dirname, "dist"),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env", 
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    }
                },
            },
            {
                test: /\.css$/i,
                use: [
                    process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.(ttf|svg)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: 'fonts/'
                    }
                  }
                ]
              },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/src/index.html",
            filename: "index.html",
            inject: "body"
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css',
            chunkFilename: 'styles/[id].css',
        }),
    ],

    devtool: "source-map",

    devServer: {
        static: path.join(__dirname, "src"),
        historyApiFallback: true,
    },
};
