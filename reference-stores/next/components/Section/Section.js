import { pascalCase } from 'pascal-case';

const Section = ({ content }) => {
  let Component = null;

  const section =
    content?.type && pascalCase(content?.type).replace('Section', '');

  try {
    Component = require(`components/Section/${section}`).default;
  } catch {
    Component = require(`components/Section/Placeholder`).default;
  }

  return content && <Component content={content} section={section} />;
};

export default Section;
