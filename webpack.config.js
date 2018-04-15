const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports={
	entry:{
		index:"./src/js/index.js"
	},
    output: {
        path: __dirname + "/public",
        filename: "./js/[name]-[hash].js" 
    },
	devServer: {
	    contentBase: "./public",
        inline: true
	},
	module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader",
                    publicPath:"../"   
                })
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [{
                    loader: 'url-loader?limit=8192&name=img/[hash:8].[name].[ext]'
                }]
            },
            {
    　　　　　　test: /\.html$/,
    　　　　　　loader: 'html-withimg-loader'
    　　　　 },
            { 
                test: /\.(woff|svg|eot|xttf|ttf|woff2)\??.*$/, 
                use: [
                    {
                        loader: 'url-loader?limit=50000&name=./fonts/[name].[ext]'
                    }
                ]
                
            }

        ]
    },   
    //出口
    plugins:[
        new ExtractTextPlugin("./css/[name].css"),
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'./index.html',
            chunks:['index'],
            hash:true,
            minify:{
                removeAttributeQuotes: true, // 移除属性的引号
                caseSensitive: false, //是否大小写敏感
                removeComments:true, // 去除注释
                removeEmptyAttributes:true, // 去除空属性
                collapseWhitespace: true //是否去除空格
            }

        })

    ]
}  