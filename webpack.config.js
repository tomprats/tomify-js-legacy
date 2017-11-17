const webpack = require("webpack");
const path = require("path");

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: "tomify.js",
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
        use: [
          "babel-loader",
          {
            loader: "eslint-loader",
            options: {emitWarning: true}
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({"React": "react"})
  ],
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },
};
