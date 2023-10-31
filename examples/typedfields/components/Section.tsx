import type { ContentTypedFields } from '@/gql/graphql';
import dynamic from 'next/dynamic';
import { pascalCase } from 'pascal-case';

const Placeholder = () => <div>Component not found</div>;

interface Props {
  content: ContentTypedFields;
}

const Section = ({ content }: Props): JSX.Element | null => {
  const sectionComponents = {
    Article: dynamic(() => import('./Article')),
    Links: dynamic(() => import('./Links')),
    Placeholder
  };

  const section = (
    content?.__typename &&
    pascalCase(content?.__typename).replace('TypedFieldsexampleproject', '')
  )?.replace('Fields', '') as keyof typeof sectionComponents;

  const Component = sectionComponents[section] || sectionComponents.Placeholder;

  return content && <Component content={content} section={section} />;
};

export default Section;
