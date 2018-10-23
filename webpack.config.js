var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

module.exports = {
   entry: {
       app: './react_app/index.jsx'
   },
   output: {
       path: path.resolve(__dirname, 'react_app_built'),
       filename: '[name].js'
   },
   module: {
       rules: [
           {
               test: /\.scss$/,
               use: ExtractTextPlugin.extract({
                   fallback: 'style-loader',
                   use: ['css-loader','sass-loader'],
                   publicPath: 'react_app_built'
               })
           },
           {
               test: /\.jsx?$/,
               exclude: /node_modules/,
               use: [
                   {
                        loader: 'babel-loader',
                        options: {
                            presets: ['react']
                        }
                    }
                ],
           },
           {
               test: /\.(jpe?g|png|gif|svg)$/i,
               use: [
                   'file-loader?name=[name].[ext]&outputPath=images/&publicPath=http://localhost/celestial/wp-content/themes/empty_theme/react_app_built/images',
                   'image-webpack-loader'
               ]
           },
           { test:
               /\.(woff2?|svg)$/,
               loader: 'url-loader?limit=10000&name=fonts/[name].[ext]'
           },
           {
               test: /\.(ttf|eot)$/,
               loader: 'file-loader?name=fonts/[name].[ext]'
           }
       ]
   },
   resolve: {
       extensions: ['.js', '.jsx']
   },
   plugins: [
       new ExtractTextPlugin({
           filename: "style.css",
           allChunks: true
       })
   ]
}