const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    library: "AppinionWidget",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      { test: /\.svg$/, use: ["file-loader"] },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            targets: {
              esmodules: true,
            },
            presets: [
              "@babel/preset-env",
              {
                exclude: [
                  "transform-async-to-generator",
                  "transform-regenerator",
                ],
              },
            ],
            plugins: [
              "@babel/plugin-transform-runtime",
              [
                "@babel/plugin-transform-react-jsx",
                {
                  pragma: "h",
                  pragmaFrag: "Fragment",
                },
              ],
              [
                "babel-plugin-jsx-pragmatic",
                {
                  module: "preact",
                  export: "h",
                  import: "h",
                },
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new UglifyJsPlugin({ sourceMap: true }),
    new HtmlWebpackPlugin({
      title: "webpack Boilerplate",
      template: path.resolve(__dirname, "./src/template.html"), // шаблон
      filename: "index.html", // название выходного файла
    }),
  ],
  resolve: {
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat",
    },
  },
};
