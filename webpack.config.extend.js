const babelPackages = require('./babelPackages');

module.exports = (webpackConfig, env, { paths }) => {
  return babelPackages(webpackConfig);
};
