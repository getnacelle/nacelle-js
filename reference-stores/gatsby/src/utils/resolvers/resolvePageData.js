const { resolveFeaturedProducts } = require('./resolveFeaturedProducts');

const resolvePageData = async ({ graphql, page }) => {
  try {
    const sections = await Promise.all(
      page?.remoteFields?.sections?.map((section) => {
        switch (section.type) {
          case 'sectionFeaturedProducts':
            return resolveFeaturedProducts({
              graphql,
              section
            });
          default:
            return section;
        }
      })
    );
    return {
      ...page,
      remoteFields: { ...page.remoteFields, sections }
    };
  } catch {
    return page;
  }
};

exports.resolvePageData = resolvePageData;
