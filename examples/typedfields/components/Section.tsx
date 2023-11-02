import { ContentTypedFields } from '@/gql/graphql';
import Article from './Article';
import Links from './Links';

const Placeholder = () => <div>Component not found</div>;

interface Props {
  content: ContentTypedFields;
}

const Section: React.FC<Props> = ({ content }) => {
  let Component: JSX.Element | null = <Placeholder />;

  switch (content.__typename) {
    case 'TypedFieldsExampleArticleFields':
      Component = <Article content={content} />;
      break;
    case 'TypedFieldsExampleLinksFields':
      Component = <Links content={content} />;
      break;
    default:
      Component = <Placeholder />;
  }

  return Component;
};

export default Section;
