export const buildMeta = ({ meta, product, collection, route }) => {
  let title = 'Nuxt Reference Store';
  let description = 'A Nacelle-powered storefront built with Nuxt.js';

  if (meta) {
    const metaTitle = meta.fields?.seoTitle;
    if (metaTitle) title = metaTitle;
    const metaDescription = meta.fields?.seoDescription;
    if (metaDescription) description = metaDescription;
  } else if (product) {
    const productTitle = product.content.title;
    const productDescription = product.content.description;
    if (productTitle) title = `${title} | ${productTitle}`;
    if (description) description = productDescription;
  } else if (collection) {
    const collectionTitle = collection.content.title;
    const collectionDescription = collection.content.description;
    if (collectionTitle) title = `${title} | ${collectionTitle}`;
    if (description) description = collectionDescription;
  } else if (route) {
    const paths = route.path.split('/');
    const path = paths[paths.length - 1];
    if (path) {
      const parts = path.replace('-', ' ').split(' ');
      const routeTitle = parts.reduce((acc, part, index) => {
        let str = `${part.charAt(0).toUpperCase()}${part.slice(1)}`;
        if (index) str += ' ';
        return acc + str;
      }, '');
      if (routeTitle) title = `${title} | ${routeTitle}`;
    }
  }

  return {
    title,
    meta: [
      {
        hid: 'og:title',
        property: 'og:title',
        content: title
      },
      {
        // Control title used in social shares, e.g. Slack link previews
        hid: 'apple-mobile-web-app-title',
        property: 'apple-mobile-web-app-title',
        content: title
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: title
      },
      {
        hid: 'description',
        name: 'description',
        content: description
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: description
      }
    ]
  };
};
