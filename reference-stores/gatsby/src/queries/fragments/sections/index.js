// const SECTIONS_QUERY_FRAGMENT = `
//   ${require('./featuredProducts')}
//   ${require('./hero')}
//   ${require('./heroBanner')}
//   ${require('./sideBySide')}
// `;

const SECTIONS_QUERY_FRAGMENT = `
  ${require('./featuredProducts')},
  ${require('./promoStrip')},
  ${require('./sideBySideFull')}
`;

exports.SECTIONS_QUERY_FRAGMENT = SECTIONS_QUERY_FRAGMENT;
