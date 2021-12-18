const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js',
});

const PLAUSIBLE_URL = process.env.SELF_HOSTED_PLAUSIBLE_URL || 'https://plausible.io/';

module.exports = withNextra({
  async rewrites() {
    return [
      {
        source: '/js/script.js',
        destination: `${PLAUSIBLE_URL}/js/plausible.js`,
      },
      {
        source: '/api/event',
        destination: `${PLAUSIBLE_URL}/api/event`,
      },
    ];
  },
});
