import React from 'react';
import { pascalCase } from 'pascal-case';

const Section = ({ content }) => {
  const sectionComponents = {
    ContactForm: require('./ContactForm').default,
    CtaStrip: require('./CtaStrip').default,
    FeaturedProducts: require('./FeaturedProducts').default,
    Hero: require('./Hero').default,
    HeroBanner: require('./HeroBanner').default,
    PromoStrip: require('./PromoStrip').default,
    Placeholder: require('./Placeholder').default,
    SideBySide: require('./SideBySide').default,
    SideBySideFull: require('./SideBySideFull').default,
    TeamBios: require('./TeamBios').default
  };

  const section =
    content?.type && pascalCase(content?.type).replace('Section', '');

  const Component = sectionComponents[section] || sectionComponents.Placeholder;

  return content && <Component content={content} section={section} />;
};

export default Section;
