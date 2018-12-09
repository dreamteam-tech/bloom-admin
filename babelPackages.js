const path = require('path');

module.exports = webpackConfig => {
  const include = [
    path.resolve(__dirname, 'src'),
    path.resolve(__dirname, 'packages')
  ];

  const rules = webpackConfig.module.rules;
  rules[2].oneOf[1] = { ...rules[2].oneOf[1], include };

  return {
    ...webpackConfig,
    module: {
      ...webpackConfig.module,
      rules
    }
  };
};
