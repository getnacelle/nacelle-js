require("dotenv").config();

const NacelleClient = require("@nacelle/storefront-sdk").default;

const client = new NacelleClient({
  storefrontEndpoint: process.env.GATSBY_NACELLE_STOREFRONT_ENDPOINT,
  token: process.env.GATSBY_NACELLE_STOREFRONT_TOKEN,
});

module.exports = {
  plugins: [
    {
      // for more infromation, see https://www.npmjs.com/package/@nacelle/gatsby-source-nacelle
      resolve: "@nacelle/gatsby-source-nacelle",
      options: {
        nacelleClient: client,
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
  ],
};
