module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        stream: require.resolve("stream-browserify"),
        util: require.resolve("util"),
        buffer: require.resolve("buffer"),
        crypto: require.resolve("crypto-browserify"),
        vm: require.resolve("vm-browserify")
      };
      return webpackConfig;
    }
  }
};
