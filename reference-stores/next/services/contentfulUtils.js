import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export default {
  richText: documentToHtmlString,
  imageUrl: (image) => `https:${image.fields.file.url}`
};
