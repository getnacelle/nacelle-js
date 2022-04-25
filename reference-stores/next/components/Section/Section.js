import { pascalCase } from 'pascal-case';

const Section = ({ content }) => {
  let Component = null;

  const section =
    content?.type && pascalCase(content?.type).replace('Section', '');

  try {
    Component = require(`'components/section/${section}`).default;
  } catch {
    Component = require(`components/section/Placeholder`).default;
  }

  return content && <Component content={content} section={section} />;
};

export default Section;
