module.exports = {
  modify: (config, {
    target,
    dev
  }, webpack) => {
    // do something to config
    config.node = {
      fs: "empty",
      child_process: "empty",
      net: "empty",
      tls: "empty"
    }
    return {
      ...config,
      externals: 'node_modules'
    };
  },
  plugins: ['typescript', 'scss'],
};