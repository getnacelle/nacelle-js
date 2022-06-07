const path = require('path');
require('dotenv').config();

const NacelleClient = require('@nacelle/storefront-sdk').default;

const client = new NacelleClient({
  storefrontEndpoint: process.env.GATSBY_NACELLE_STOREFRONT_ENDPOINT,
  token: process.env.GATSBY_NACELLE_STOREFRONT_TOKEN,
  locale: process.env.GATSBY_NACELLE_STOREFRONT_LOCALE
});

module.exports = {
  plugins: [
    {
      // for more infromation, see https://www.npmjs.com/package/@nacelle/gatsby-source-nacelle
      resolve: '@nacelle/gatsby-source-nacelle',
      options: {
        nacelleClient: client
      }
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        resolveModules: [path.join(__dirname, 'src')]
      }
    },
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [require('tailwindcss'), require('autoprefixer')]
      }
    },
    "gatsby-plugin-image",
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp'
  ]
};
