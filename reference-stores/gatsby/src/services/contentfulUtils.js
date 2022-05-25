import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export default {
  richText: (field) =>
    typeof field === 'string'
      ? field
      : documentToHtmlString(resolveRichText(field)),
  imageUrl: (image) => `https:${image.remoteFields.file.url}`,
  test: (field) => resolveRichText(field)
};

const resolveRichText = (entry) => {
  if (typeof entry === 'object') {
    if (Array.isArray(entry)) {
      return entry
        .filter((item) => item)
        .map(({ content, data, marks, ...rest }) => ({
          ...rest,
          content: Array.isArray(content) ? resolveRichText(content) : null,
          data: data || {},
          marks: marks || []
        }));
    } else {
      const { content, data, marks, ...rest } = entry;
      return {
        ...rest,
        content: Array.isArray(content) ? resolveRichText(content) : null,
        data: data || {},
        marks: marks || []
      };
    }
  }
};
