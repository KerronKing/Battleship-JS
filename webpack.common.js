const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.html$/i,
        use: 'html-loader',
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'dist/assets',
              disable: true,
            },
          },
        ],
      },
    ],
  },
  watch: true,
};
