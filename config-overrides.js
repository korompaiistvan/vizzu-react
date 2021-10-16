module.exports = function override(config, env) {
  config.module.rules.push({
    test: /\.js$/,
    loader: require.resolve("@open-wc/webpack-import-meta-loader"),
  });

  return config;
};
