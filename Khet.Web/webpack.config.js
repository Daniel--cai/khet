const path = require('path')
const webpack = require('webpack')
module.exports = {
    //input
    entry: './src/',

    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.jsx?/,
                loader: 'babel-loader',
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader',
                exclude: /node_modules/
            },
            //{
            //     test: /\.(png|jpg)$/,
            //     use: 'file-loader',
            //     exclude: /node_modules/,
            // },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        query: {
                            modules: true,
                            localIdentName: '[local]_[hash:base64:5]'
                        }
                    }
                ]
            }

        ]
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        compress: true,
        historyApiFallback: true,
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        })
    ]
    //server
}