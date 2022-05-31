const SECTIONS_QUERY_FRAGMENT = `
  ${require('./contactForm')},
  ${require('./ctaStrip')},
  ${require('./hero')},
  ${require('./heroBanner')},
  ${require('./featuredProducts')},
  ${require('./promoStrip')},
  ${require('./sideBySide')},
  ${require('./sideBySideFull')},
  ${require('./teamBios')}
`;

exports.SECTIONS_QUERY_FRAGMENT = SECTIONS_QUERY_FRAGMENT;
