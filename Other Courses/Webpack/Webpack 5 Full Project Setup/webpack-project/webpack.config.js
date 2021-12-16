const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const path = require("path");

let mode = "development";
let target = "web";

if (process.env.NODE_ENV === "production") {
  mode = "production";
  target = "browserslist";
}

module.exports = {
  mode: mode,
  target: target,
  output: {
    // to be able to clear dist folder, you have to define the output folder
    path: path.resolve(__dirname, "dist"),
    // to create a folder named images and put the images inside
    assetModuleFilename: "images/[hash][ext][query]",
  },
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    hot: true, // hot module replacement
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        // asset/resource: creates folder, put all images inside,
        // asset/inline: binds images to js inline,
        // asset: big images to folder, small images to inline
        type: "asset",
        // to limit the max file size
        // parser: {
        //   dataUrlCondition: {
        //     maxSize: 30 * 1024
        //   }
        // }
      },
      {
        test: /\.(s[ac]|c)ss$/i, // to be able to handle css, scss, sass
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "" },
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // clears dist folder
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }), // creates html file in dist folder
  ],
  resolve: {
    extensions: [".js", ".jsx"], // to handle file extensions
  },
};
