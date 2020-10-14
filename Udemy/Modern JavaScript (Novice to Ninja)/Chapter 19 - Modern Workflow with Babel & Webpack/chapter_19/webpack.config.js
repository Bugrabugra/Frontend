const path = require("path");

module.exports = {
  entry: "C:\\Users\\Bugra\\PycharmProjects\\Piton\\Frontend\\Udemy\\chapter_19\\src\\index.js",
  output: {
    path: path.resolve(__dirname, "dist/assets"),
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    publicPath: "/assets/"
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"]
        }
      }
    }]
  }
};