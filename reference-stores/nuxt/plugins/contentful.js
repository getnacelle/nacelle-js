import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export default (_, inject) => {
  const contentful = {
    richText: (field) =>
      typeof field === 'string' ? field : documentToHtmlString(field),
    imageUrl: (image) => `https:${image.fields.file.url}`
  };
  inject('contentful', contentful);
};
