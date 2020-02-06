const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js']
  },

  entry: './src/js/app.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
  },

  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },

      { test: /\.css$/i, use: ['style-loader', 'css-loader'] },

      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ]
  },

};