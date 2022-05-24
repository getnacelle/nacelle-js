import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export default {
  richText: (field) =>
    typeof field === 'string' ? field : documentToHtmlString(field),
  imageUrl: (image) => `https:${image.fields.file.url}`
};
