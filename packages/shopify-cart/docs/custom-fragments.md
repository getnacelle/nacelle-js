# Custom fragments in `@nacelle/shopify-cart`

`@nacelle/shopify-cart` uses [GraphQL][graphql-docs] queries and mutations to create and modify Shopify `Cart`s. We use GraphQL [fragments][graphql-fragments-docs] to specify properties of interest for things like `cart.lines.merchandise`, `cart.discountAllocations`, and `userErrors`.

Because `Cart` data needs will vary project-to-project, it's important that developers have the power to specify which properties of the `Cart` object or its sub-properties should be returned in `cartClient` responses. By providing `customFragments` to the `cartClient`, developers can enjoy the convenience of `@nacelle/shopify-cart` with the flexibility of GraphQL.

## Prerequisites

1. If you don't have prior experience with GraphQL fragments in GraphQL queries/mutations, please refer to the [GraphQL docs on fragments][graphql-fragments-docs].
2. If you aren't yet familiar with the schema for Shopify `Cart` data, use your favorite GraphQL client (or [Shopify's Storefront API GraphiQL explorer][shopify-graphiql-explorer]) to explore the Shopify Storefront API's GraphQL schema for [the `Cart` object][shopify-cart-object] and its sub-properties. Once you're comfortable with the location and property names of the cart data you're interested in, you can start crafting `customFragments` for `@nacelle/shopify-cart`.

## Initializing the `cartClient` with `customFragments`

`customFragments` are provided to the `createShopifyCartClient` initialization params as an object containing pairs of `FRAGMENT_KEY` and GraphQL fragment strings:

```js
const cartClient = createShopifyCartClient({
  // ...other params,
  customFragments: {
    FRAGMENT_KEY: `
      fragment SomeFragment on GraphqlTypeOfInterest {
        fieldOfInterest
      }
    `
  }
});
```

Valid `FRAGMENT_KEY`s include:

| Fragment Key          | Expected GraphQL type of fragment | Fragment Variety                      |
| --------------------- | --------------------------------- | ------------------------------------- |
| `BUYER_IDENTITY`      | `CartBuyerIdentity`               | [Replacement](#replacement-fragments) |
| `DISCOUNT_ALLOCATION` | `CartDiscountAllocation`          | [Replacement](#replacement-fragments) |
| `EXTEND_CART`         | `Cart`                            | [Extension](#extension-fragments)     |
| `EXTEND_CART_LINE`    | `CartLine`                        | [Extension](#extension-fragments)     |
| `MERCHANDISE`         | `ProductVariant`                  | [Replacement](#replacement-fragments) |
| `MONEY`               | `MoneyV2`                         | [Replacement](#replacement-fragments) |
| `USER_ERRORS`         | `CartUserError`                   | [Replacement](#replacement-fragments) |

Please take care to ensure that your fragments use the expected GraphQL types. If a fragment is provided with an unexpected GraphQL type, `@nacelle/shopify-cart` will throw an error when the `cartClient` is initialized.

The fragment name (example: `SomeFragment` in `fragment SomeFragment on GraphqlTypeOfInterest`) can be a name of your choosing.

## Default fragments

Please check out `@nacelle/shopify-cart`'s [default GraphQL fragments][nacelle-shopify-cart-fragments]. Familiarity with these fragments will help you to identify which fragments you'd like to augment or override.

There are two flavors of GraphQL fragments that you can supply as `customFragments` - "extension" fragments, and "replacement" fragments.

## Extension fragments

Extension fragments make additive changes to the default fragments. When supplying an extension fragment, you can only query for more data, not less. Extension fragments have `customFragments` keys that start with "`EXTEND_`".

## Replacement fragments

Replacement fragments totally override `@nacelle/shopify-cart`'s default fragments, except for any data fields that are required by `@nacelle/shopify-cart`. Any `customFragments` keys that do not start with "`EXTEND_`" are replacement fragments.

## Examples

### Querying `sellingPlanAllocation` data on cart line items

Before attempting to query Selling Plan data, please ensure that the [`unauthenticated_read_selling_plans` access scope][shopify-access-scopes] is enabled on your Shopify Storefront API token.

The `CartLine` data returned by `@nacelle/shopify-cart` doesn't include `sellingPlanAllocation` data by default. We can query for `sellingPlanAllocation` data by supplying an `EXTEND_CART_LINE` fragment to the client's `customFragments`.

```js
const cartClient = createShopifyCartClient({
  shopifyShopId: '<your-shop-id>',
  shopifyStorefrontAccessToken: '<your-shopify-storefront-api-access-token>',
  customFragments: {
    EXTEND_CART_LINE: `
      fragment CartLine_sellingPlan on CartLine {
        sellingPlanAllocation {
          sellingPlan {
            id
            name
            recurringDeliveries
          }
          priceAdjustments {
            perDeliveryPrice {
              amount
              currencyCode
            }
          }
        }
      }
    `
  }
});
```

### Customizing `merchandise` data

If the default `merchandise` data doesn't overlap with the needs of your project's cart, you can supply a `MERCHANDISE` fragment to the client's `customFragments`. If your project's cart UI is using product and variant data from Nacelle and only needs a handful of Shopify `Cart` properties (`barcode`, `currentlyNotInStock`, and `requiresShipping`), you could supply the following `MERCHANDISE` fragment to query only for the `merchandise` data on interest:

```js
const cartClient = createShopifyCartClient({
  shopifyShopId: '<your-shop-id>',
  shopifyStorefrontAccessToken: '<your-shopify-storefront-api-access-token>',
  customFragments: {
    MERCHANDISE: `
      fragment ProductVariant_merchandise on ProductVariant {
        barcode
        currentlyNotInStock
        requiresShipping
      }
    `
  }
});
```

<!-- LINKS -->

[graphql-docs]: https://graphql.org/learn
[graphql-fragments-docs]: https://graphql.org/learn/queries/#fragments
[nacelle-shopify-cart-fragments]: https://github.com/getnacelle/nacelle-js/tree/main/packages/shopify-cart/src/graphql/fragments
[shopify-access-scopes]: https://shopify.dev/api/usage/access-scopes#unauthenticated-access-scopes
[shopify-cart-object]: https://shopify.dev/api/storefront/2023-01/objects/Cart
[shopify-cart-user-error]: https://shopify.dev/api/storefront/2023-01/objects/CartUserError
[shopify-graphiql-explorer]: https://shopify.dev/custom-storefronts/tools/graphiql-storefront-api
