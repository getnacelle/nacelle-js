import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export default (_, inject) => {
  const contentful = {
    richText: documentToHtmlString,
    imageUrl: (image) => `https:${image.fields.file.url}`
  };
  inject('contentful', contentful);
};
