module.exports = function(config) {
  let loaderList = config.module.rules[1].oneOf;
  loaderList.splice(0, 1, {
    test: /\.(gif|png|jpe?g|svg|jpg)$/i,
    use: [
      "file-loader?name=[path].[ext]",
      {
        loader: "image-webpack-loader",
        options: {
          bypassOnDebug: true,
          disable: true
        }
      }
    ]
  });
};
