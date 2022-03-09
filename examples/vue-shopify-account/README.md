# Accounts example

Utilizing Shopify Storefront API.

---

## Summary

We want a simple solution to handling customer accounts that doesn't involve maintaining code in Shopify's Theme. This example should give us all of the basic account functionality that we need.

If you want to have a better understanding of the queries and mutations that we are utlizing, check out the [Shopify API documentation](https://shopify.dev/api) and [Manage customer accounts with the Storefront API](https://shopify.dev/api/examples/customer-accounts) example.

## Prerequisites

- Must be on the [Shopify Plus](https://www.shopify.com/plus/enterprise-ecommerce) plan.
- You'll need your store's Storefront API token.

## Setup

1. add a few items to our `.env` file:

```sh
VITE_MYSHOPIFY_DOMAIN=""
VITE_SHOPIFY_TOKEN=""
VITE_SHOPIFY_ADMIN_PASSWORD=""
```

this specific project uses vite for frontend tooling, in your own project if you aren't using vite, the `VITE_` prefix is unnecessary.

2. `npm install`

3. you will also need the [vercel CLI](https://vercel.com/cli) installed in order to test serverless functions

## Serverless Functions

To use the address form for account pages this project relies on [countrycitystatejson](https://github.com/khkwan0/countryCityStateJson)

Both of these packages are _large_ and can add a lot to your client bundle, so using them only in serverless functions keeps the client a little more lightweight. But if you want another reason, it also keeps your admin API token outside of client code.

This project includes a folder for serverless functions:

- Vercel in [api/\*](./api)

When testing your serverless functions locally make sure to use the platform's CLI ([Vercel CLI](https://vercel.com/docs/cli). NPM scripts for running the project with these CLI's are provided in the `package.json`.

## Functions

All the functions to interact with the API live in the `/components/AccountProvider.vue` file and the graphql queries are in the `/gql/index.js`.

We are using [the composition API](https://vuejs.org/guide/extras/composition-api-faq.html) for state management but this can be integrated into any state management system.

## Using Nuxt?

If you are implementing this system into a nuxt project we recommend using [middleware](https://nuxtjs.org/docs/directory-structure/middleware/) to protect authenticated routes:

Here is an example of what it might look like:

`middleware/authenticated.js`

```js
export default function (ctx) {
  const { store, redirect, app } = ctx;
  // If the user is not authenticated
  const customerAccessToken = app.$cookies.get('customerAccessToken');
  if (customerAccessToken === undefined || customerAccessToken === false) {
    return redirect('/account/login');
  }
}
```

`middleware/notAuthenticated.js`

```js
export default function ({ store, redirect, app }) {
  // If the user is authenticated redirect to account
  const customerAccessToken = app.$cookies.get('customerAccessToken');

  if (customerAccessToken) {
    return redirect('/account');
  }
}
```

These examples assume the addition of `cookie-universal-nuxt` [package](https://www.npmjs.com/package/cookie-universal-nuxt).

## Shopify Email Notifications

1. Password Recovery and Reset

   - During the password recovery flow, an email is sent to the customer with a link to the reset their password. We'll want to make sure to edit this link to point towards our app instead of the Shopify hosted domain.
   - We are using using query parameters vs url parameters since we are using static site generation and can't handle dynamic routes.
   - The url path will appear like:

     - `/account/reset?id=2864558604347&token=a000add20a69bb53954976edd74870a4-1581119357`

     versus:

     - `/account/reset/2864558604347/a000add20a69bb53954976edd74870a4-1581119357`

```liquid
{% comment %}
  Edit Customer Account Reset (/admin/email_templates/customer_account_reset/edit)
  ----
  Old tag:
  <a href="{{ customer.reset_password_url }}" class="button__text">Reset your password</a>
{% endcomment %}
{% assign url_parts = customer.reset_password_url  | split: '/' %}
<a href="http://domain.com/account/activate?id={{url_parts[5]}}&token={{url_parts[6]}}" class="button__text">Reset your password</a>
```

1. Account Activate

   - The merchant can send an account activation email with a link to the storefront to create a password and activate their account. We'll want to make sure to edit this link to point towards our app instead of the Shopify hosted domain.
   - We are using using query parameters vs url parameters since we are using static site generation and can't handle dynamic routes.
   - The url path will appear like:

     - `/account/activate?id=2864558604347&token=a000add20a69bb53954976edd74870a4-1581119357`

     versus:

     - `/account/activate/2864558604347/a000add20a69bb53954976edd74870a4-1581119357`

```liquid
{% comment %}
  Edit Customer Account Invite (/admin/email_templates/customer_account_activate/edit)
  ----
  Old tag:
  <a href="{{ customer.account_activation_url }}" class="button__text">Activate Account</a>
{% endcomment %}
{% assign url_parts = customer.account_activation_url  | split: '/' %}
<a href="http://domain.com/account/activate?id={{url_parts[5]}}&token={{url_parts[6]}}" class="button__text">Activate Account</a>
```
