const merge = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "cheap-module-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "../dist-client"),
    historyApiFallback: true,
    hotOnly: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});
