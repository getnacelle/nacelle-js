import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export default (_, inject) => {
  const contentful = {
    richText: documentToHtmlString
  };
  inject('contentful', contentful);
};
