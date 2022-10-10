import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export default {
  richText: (field) => {
    try {
      // rich text comes back as JSON,
      // so if passed unparsed JSON parse it before handling rich text
      let parsedField = field;
      if (typeof parsedField === 'string') {
        parsedField = JSON.parse(field);
      }
      return documentToHtmlString(resolveRichText(parsedField));
    } catch {
      return field;
    }
  }
};

const resolveRichText = (entry) => {
  if (typeof entry === 'object') {
    if (Array.isArray(entry)) {
      return entry
        .filter((item) => item)
        .map(({ content, data, marks, ...rest }) => ({
          ...rest,
          content: Array.isArray(content) ? resolveRichText(content) : null,
          data: data ?? {},
          marks: marks ?? []
        }));
    } else {
      const { content, data, marks, ...rest } = entry;
      return {
        ...rest,
        content: Array.isArray(content) ? resolveRichText(content) : null,
        data: data ?? {},
        marks: marks ?? []
      };
    }
  }
};
