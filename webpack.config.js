<<<<<<< HEAD
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // подключили плагин 

module.exports = {
    entry: { main: "./src/pages/index.js" },
=======
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: { main: './src/pages/index.js' },

>>>>>>> e54268ef1fdaff0a42e40e1e1a6f8e858bb53459
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: '',
    },

    mode: 'development',

    devServer: {
<<<<<<< HEAD
        static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
        compress: true, // это ускорит загрузку в режиме разработки
        port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт

        open: true // сайт будет открываться сам при запуске npm run dev
    },

    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: { importLoaders: 1 },
                    },
                    "postcss-loader",
                ],
=======
        static: path.resolve(__dirname, './dist'),
    },
    
    module: {
        rules: [ // Массив правил
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: '/node_modules/' // исключает папку node_modules
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: { importLoaders: 1 }
                },
                    'postcss-loader']
>>>>>>> e54268ef1fdaff0a42e40e1e1a6f8e858bb53459
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
                generator: {
                    filename: "images/[name][ext]",
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
                generator: {
                    filename: "fonts/[name][ext]",
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
<<<<<<< HEAD
            template: "./src/index.html",
        }),
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin(), // использовали плагин

    ],
};
=======
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
    ]
}
>>>>>>> e54268ef1fdaff0a42e40e1e1a6f8e858bb53459
