module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // eslint-disable-next-line no-param-reassign
      config.target = 'electron-renderer';
    }

    return config;
  },
};
