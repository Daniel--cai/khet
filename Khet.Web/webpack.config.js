const path = require('path')
module.exports = {
    //input
    entry: './src/',

    output: {
        path: path.join(__dirname, 'build'),
        filename:'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    plugins: [
                        ['transform-react-jsx', {pragma: 'h'}]
                    ]
                }
            }
        ]
    },
    devtool: 'source-map',
    devServer :{
        contentBase: path.join(__dirname, 'src'),
        compress:true,
        historyApiFallback:true
    }
    //server
}