# Sanity Custom Input Plugin: Nacelle PIM Linker

[Nacelle](https://nacelle.com/docs) powers headless commerce projects by orchestrating product and content data. This plugin provides a [custom input component](https://www.sanity.io/docs/custom-input-widgets) for Sanity Studio that helps you reference product & collection data ingested by Nacelle.

<details>
  <summary>Expand to see the custom input component in action!</summary>
  <img src="https://user-images.githubusercontent.com/5732000/105260780-65532a00-5b5c-11eb-9cc5-c5f8bddb89b4.gif" alt="The Nacelle PIM Linker component is used in Sanity Studio to select products stored in Nacelle's indices">
</details>

## Installation & Setup

### Install Peer Dependencies

`npm i @sanity/ui styled-components`

### Install the plugin

`sanity install @nacelle/sanity-plugin-nacelle-input`

### Credentials

You'll need to provide the ID and Token associated with your Nacelle space. These credentials can be found in the [Nacelle Dashboard](https://dashboard.nacelle.com).

#### Adding credentials to a single space:

##### Config file for single space - `./config/@nacelle/sanity-plugin-nacelle-input.json`

```json
{
  "nacelleEndpoint": "your-nacelle-storefront-api-endpoint",
  "nacelleSpaceToken": "your-nacelle-graphql-token"
}
```

##### in `.env.development` / `.env.production`

```
SANITY_STUDIO_NACELLE_SPACE_ENDPOINT=your-nacelle-storefront-endpoint
SANITY_STUDIO_NACELLE_SPACE_TOKEN=your-nacelle-public-storefront-token
```

#### Adding Credentials to multiple spaces

Create a config file at `./config/@nacelle/sanity-plugin-nacelle-input.json`. Then add a `nacelleSpaces` array like so:

```json
"nacelleSpaces": [
    {
      "spaceName": "Space 1",
      "nacelleEndpoint": "space-1's-nacelle-storefront-endpoint",
      "nacelleSpaceToken": "space-1's-nacelle-public-storefront-token"
    },
    {
      "spaceName": "Space 2",
      "nacelleEndpoint": "space-2's-nacelle-storefront-endpoint",
      "nacelleSpaceToken": "space-2's-nacelle-public-storefront-token"
    }
  ]
```

## Use in Schema Documents

Set the `type` field to `nacelleData` to use the custom input component:

```js
{
  name: 'handle',
  title: 'Handle',
  type: 'nacelleData',
}
```

### Options

By default, the custom input component allows you to choose a `handle` from either products or collections.

Realistically, you probably want to restrict the component to _either_ products or collections. To do that, provide either `['products']` or `['collections']` to `options.dataType`:

```js
// example: collections ONLY
{
  name: 'collectionHandle',
  title: 'Collection',
  type: 'nacelleData',
  options: {
    dataType: ['collections']
  }
}
```

```js
// example: products ONLY
{
  name: 'productHandle',
  title: 'Product',
  type: 'nacelleData',
  options: {
    dataType: ['products']
  }
}
```

### Using This Data in Your Frontend Project

Since this custom input component just stores the `handle` of a particular product or collection, you'll use the [Nacelle Storefront SDK](https://nacelle.com/docs/querying-data/storefront-sdk?nacelle=v2&storefrontSdk=1.0.3) to fetch the associated product or collection object.

#### Product

```js
const products = await client.products({
  handles: ['handle-from-my-sanity-entry']
})
```

#### Collection

```js
const collections = await client.collections({
  handles: ['handle-from-my-sanity-entry']
})
```

---

## Contributing

Instructions for working on the repo directly.

### Testing Changes/Running Locally

The best way to test changes to this plugin is by using `npm link` to use it from a Sanity project with the plugin installed. The instructions for doing that should be below:

1. Open your local fork of this project in your terminal
2. Run `npm run build` to generate the dist files for this project locally.
3. Run `npm link` to setup an npm symlink for this project
4. (Optional) Run `npm run build -- --watch`, this will automatically rebuild whenever you make any local changes
5. In another terminal, navigate to an existing Sanity project which has this plugin installed. (If you don't have one, you can follow the instructions above to create one)
6. Run `npm link @nacelle/sanity-plugin-nacelle-input` - this will link the version of the `@nacelle/sanity-plugin-nacelle-input` in your local Sanity Project to your local clone of this repo.
7. Run your command to start Sanity Studio, e.g. `npm run start`. You should see any changes you've made locally to this repo in your studio.
   - If you used the watch command in step 4, you should be able to make changes to this repo and then reload the page to see them reflected in the studio.
