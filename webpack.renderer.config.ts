import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

export const rendererConfig: Configuration = {
  // Enable sourcemaps only in development mode
  devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
  externals: {
    'fs': 'commonjs fs',
    'child_process': 'commonjs child_process',
  },
};
