const path = require("path");

module.exports = {
  entry: "./src/tomify.js",
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "tomify.js",
    library: "Tomify"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      }
    ]
  }
};
