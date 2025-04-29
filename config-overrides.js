const path = require('path');

module.exports = function override(config, env) {
  config.watchOptions = {
    poll: true
  };

  // エントリーポイントの変更
  config.entry = path.resolve(__dirname, 'src', 'index.tsx');

  // TypeScript (.ts, .tsx) ファイルを処理するためのルールを追加
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: path.resolve(__dirname, 'src'),
    loader: require.resolve('ts-loader'),
    options: {
      transpileOnly: true, // 型チェックは TypeScript コンパイラに任せる
      configFile: path.resolve(__dirname, 'tsconfig.json') // tsconfig.json のパスを明示的に指定
    }
  });

  // resolve の extensions に .ts と .tsx を追加
  config.resolve.extensions = [
    ...(config.resolve.extensions || []),
    '.ts',
    '.tsx'
  ];

  // Babel プラグインの追加
  config.module.rules.forEach((rule) => {
    if (rule.oneOf) {
      rule.oneOf.forEach((oneOf) => {
        if (oneOf.loader && oneOf.loader.includes('babel-loader')) {
          oneOf.options.plugins = [
            ...(oneOf.options.plugins || []),
            require.resolve('styled-jsx/babel') // 正しい指定
          ];
        }
      });
    }
  });

  return config;
};
