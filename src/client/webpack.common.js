const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["@babel/polyfill", path.resolve(__dirname, "src/index")],

  output: {
    path: path.resolve(__dirname, "../dist-client"),
    filename: "bundle.js",
    publicPath: "/"
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader"
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css"
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      filename: "index.html",
      inject: "body",
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true
      }
    })
  ],

  resolve: {
    extensions: [".jsx", ".js"]
  }
};
