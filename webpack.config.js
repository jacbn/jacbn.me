/* eslint-disable */

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");

module.exports = {
    entry: [
        path.join(__dirname, "src", "index.tsx"), 
        path.join(__dirname, "src", "styles.css"),
    ],
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        alias: {
            '@': path.resolve('src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
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
                test: /\.css$/,
                use: [
                // process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            mode: "global",
                        },
                    },
                ],
                include: /\.module\.css$/,
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader", 
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                        },
                    }
                ],
                exclude: /\.module\.css$/,
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    
    output: { 
        path: path.resolve(__dirname, "dist"),
        filename: 'src/main.js'
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
