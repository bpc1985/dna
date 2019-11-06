const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: ['whatwg-fetch', './src/index.js'],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        // https://webpack.js.org/loaders/sass-loader/
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [path.join(__dirname, 'src')]
              }
            }
          },
        ],
      },
      {
        // https://webpack.js.org/guides/asset-management
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.SourceMapDevToolPlugin({})
  ],
  devServer: {
    // Fixing error refresh with React Router
    historyApiFallback: true,
    contentBase: './dist',
    hot: true,
    compress: true
  }
};
