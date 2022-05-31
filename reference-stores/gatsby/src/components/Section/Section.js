import React from 'react';
import { pascalCase } from 'pascal-case';

const Section = ({ content }) => {
  const sectionComponents = {
    // ContactForm: dynamic(() => import('./ContactForm')),
    // CtaStrip: dynamic(() => import('./CtaStrip')),
    FeaturedProducts: require('./FeaturedProducts').default,
    // Hero: dynamic(() => import('./Hero')),
    // HeroBanner: dynamic(() => import('./HeroBanner')),
    PromoStrip: require('./PromoStrip').default,
    Placeholder: require('./Placeholder').default,
    // SideBySide: dynamic(() => import('./SideBySide')),
    SideBySideFull: require('./SideBySideFull').default
    // TeamBios: dynamic(() => import('./TeamBios'))
  };

  const section =
    content?.type && pascalCase(content?.type).replace('Section', '');

  const Component = sectionComponents[section] || sectionComponents.Placeholder;

  return content && <Component content={content} section={section} />;
};

export default Section;
