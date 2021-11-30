const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;


module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "awesome.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin()
  ],
  devServer: {
    port: 9000,
    static: './public'
  }
}