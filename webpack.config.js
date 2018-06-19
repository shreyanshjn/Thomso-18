var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './build');
var APP_DIR = path.resolve(__dirname, './src/client');

module.exports = {
    mode: 'development',
   entry: {
     main: APP_DIR + '/index.js'
   },
   output: {
     filename: 'bundle_[name].js',
     chunkFilename: '[name].[chunkhash].bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
   module: {
    rules: [
     {
       test: /(\.css|.scss)$/,
       use: [{
           loader: "style-loader" // creates style nodes from JS strings
       }, {
           loader: "css-loader" // translates CSS into CommonJS
       }]
     },
     {
       test: /\.(jsx|js)?$/,
       use: [{
         loader: "babel-loader",
         options: {
           cacheDirectory: true,
           presets: ['react', 'es2015'] // Transpiles JSX and ES6
         }
       }],
       exclude: /node_modules/
     },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader?name=[path][name].[ext]',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      }
    ],

  },
  optimization: {
      splitChunks: {
    chunks: "async",
    minSize: 30000,
    minChunks: Infinity,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    automaticNameDelimiter: '~',
    name: true,
    cacheGroups: {
        vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
        },
        default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
        }
    }
}
  },
  plugins: [
   
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};


