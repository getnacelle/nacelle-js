# Nacelle Next preview example

This is an example project to demonstrate how the to get Nacelle preview data when using NextJS

- Please note that this example supports Nacelle's [v2 backend](https://dashboard.nacelle.com) only.
- For more help on how to setup Nacelle preview, [visit the Nacelle documentation](https://nacelle.com/docs/querying-data/preview-data?nacelle=v2).
- For more help on how preview works with NextJS, [visit the NextJS documentation](https://nextjs.org/docs/advanced-features/preview-mode).

## Getting Started

Clone this project and add an `.env` file with the following variables:

```
NEXT_PUBLIC_NACELLE_STOREFRONT_ENDPOINT="<YOUR_NACELLE_STOREFRONT_ENDPOINT"
NEXT_PUBLIC_NACELLE_STOREFRONT_TOKEN="<YOUR_NACELLE_STOREFRONT_TOKEN>"
NEXT_PUBLIC_NACELLE_STOREFRONT_PREVIEW_TOKEN="<YOUR_NACELLE_STOREFRONT_PREVIEW_TOKEN>"
```

Next, install dependencies and run the project.

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start
```

Once you have the demo running locally, navigate to a URL following these rules:

- For a published content navigate to: `/content/CONTENT_HANDLE` without activating the preview.
- To activate the preview navigate to: `/api/preview`
- To activate the preview & see preview content navigate to: `/api/preview?redirect=/content CONTENT_HANDLE` or `/api/preview`
- To deactivate the preview navigate to: `/api/exit-preview`
- To verify is the preview is active or not you can check whether or not you have an active preview cookie

## Project Directory

### `pages`

- `_app.js` - Sets up the rest of the project.
- `index.js` - A simple homepage to get you started.
- `content/[handle.js]` - A dynamic content page, with data being queried using the Nacelle Storefront SDK with or without the preview config.
- `api/preview.js` Takes a request that sets up the NextJS preview functionality.
- `api/exit-preview.js` Takes a request that removes the preview functionality

### `services`

- `nacelleClient.js` - Initializes the Nacelle Storefront SDK and can be imported where Nacelle data needs to be queried, such as the collection and product pages.
