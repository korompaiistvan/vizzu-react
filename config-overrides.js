const path = require("path");

module.exports = {
  webpack: function override(config, env) {
    config.module.rules.push({
      test: /\.js$/,
      loader: require.resolve("@open-wc/webpack-import-meta-loader"),
    });

    config.module.rules.push({
      test: /\.wasm$/,
      type: "javascript/auto",
      loader: "file-loader",
      options: {
        // publicPath: "[path][name].[ext]",
        publicPath: "dist/",
      },
    });

    return config;
  },
  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      // Create the default config by calling configFunction with the proxy/allowedHost parameters
      const config = configFunction(proxy, allowedHost);
      config.contentBase = [
        config.contentBase,
        path.join(__dirname, "node_modules/vizzu/dist"),
      ];

      config.open = false;

      // Return your customised Webpack Development Server config.
      return config;
    };
  },
};
