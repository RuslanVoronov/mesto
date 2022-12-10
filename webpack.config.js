const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключение плагина HtmlWebpackPlugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // подключить CleanWebpackPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // подключение mini-css-extract-plugin

module.exports = {
    entry: { main: './src/pages/index.js' },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: ''
    },

    mode: 'development',

    devServer: {
        static: path.resolve(__dirname, './dist'),
    },
    
    module: {
        rules: [ // массив правил
            // Babel
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: '/node_modules/' // исключает папку node_modules, файлы в ней обрабатывать не нужно
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: { importLoaders: 1 }
                },
                    'postcss-loader'] // PostCSS
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: "images/[name][ext]"
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: "fonts/[name][ext]"
                }
            },
        ]
    },

    devtool: 'inline-source-map',

    // Плагины
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html' // путь к файлу index.html
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(), // подключение MiniCssExtractPlugin
    ]
}
