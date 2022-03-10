function findImages(contentObject = {}, path = []) {
  if (contentObject && typeof contentObject === 'object') {
    return Object.entries(contentObject)
      .map(([key, value]) => {
        let images = findImages(value, [...path, key]);
        // if images is an array of values, flatten any nested arrays and remove nullish values
        if (images && Array.isArray(images)) {
          images = images.flat().filter((image) => image);
        }
        return images;
      })
      .flat() // collapse any nested arrays
      .filter((image) => image); // filter out any nullish values;
  } else if (typeof contentObject === 'string') {
    // if it's a string, check if it's a valid URL
    try {
      let contentString = contentObject;
      // some CMS's (Contentful) leave off the protocol from urls
      // need to add it to make the url valid
      if (contentString.startsWith('//')) {
        contentString = `https:${contentString}`;
      }
      new URL(contentString);
      // if the url has a file extension that maps to a valid image, assume it's an image
      if (contentString.match(/\.(apng|avif|gif|jpeg|jpg|png|webp)$/gi)) {
        return { path, imageUrl: contentString };
      }
    } catch (error) {
      // do nothing because it means the value isn't a valid URL
    }
  }
}

module.exports = findImages;
