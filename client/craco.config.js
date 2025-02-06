module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        stream: require.resolve("stream-browserify"),
        util: require.resolve("util"),
        buffer: false
      };
      return webpackConfig;
    }
  }
};
