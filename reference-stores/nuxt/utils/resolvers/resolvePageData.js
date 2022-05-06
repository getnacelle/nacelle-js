import { resolveFeaturedProducts } from './resolveFeaturedProducts'

export const resolvePageData = async({
  client, page
}) => {
  try {
    const sections = await Promise.all(page?.fields?.sections?.map(async(section) => {
      switch(section.type) {
        case 'sectionFeaturedProducts': 
          return await resolveFeaturedProducts({
            client, section
          })
        default:
          return section
      }
    }))
    return {
      page: {
        ...page,
        fields: { ...page.fields, sections }
      }
    }
  }
  catch {
    return { page }
  }
}
