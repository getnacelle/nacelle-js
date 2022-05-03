import dynamic from 'next/dynamic';
import { pascalCase } from 'pascal-case';

const Section = ({ content }) => {
  const sectionComponents = {
    ContactForm: dynamic(() => import('./ContactForm')),
    CtaStrip: dynamic(() => import('./CtaStrip')),
    FeaturedProducts: dynamic(() => import('./FeaturedProducts')),
    Hero: dynamic(() => import('./Hero')),
    HeroBanner: dynamic(() => import('./HeroBanner')),
    PromoStrip: dynamic(() => import('./PromoStrip')),
    Placeholder: dynamic(() => import('./Placeholder')),
    SideBySide: dynamic(() => import('./SideBySide')),
    SideBySideFull: dynamic(() => import('./SideBySideFull')),
    TeamBios: dynamic(() => import('./TeamBios'))
  };

  const section =
    content?.type && pascalCase(content?.type).replace('Section', '');

  const Component = sectionComponents[section] || sectionComponents.Placeholder;

  return content && <Component content={content} section={section} />;
};

export default Section;
