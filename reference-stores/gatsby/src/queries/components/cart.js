const { useStaticQuery, graphql } = require('gatsby');

const CartQuery = () =>
  useStaticQuery(graphql`
    {
      content: nacelleContentRemoteComponentCart(
        handle: { eq: "component-cart" }
      ) {
        remoteFields {
          heading
          emptyText
          itemQuantity
          itemRemove
          crosssellHeading
          crosssellAdd
          crosssellItems {
            remoteFields {
              handle
            }
          }
          continueText
          checkoutText
        }
      }
    }
  `);

module.exports = CartQuery;