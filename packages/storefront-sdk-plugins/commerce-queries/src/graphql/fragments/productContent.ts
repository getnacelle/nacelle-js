export default /* GraphQL */ `
	fragment ProductContent_productContent on ProductContent {
		__typename
		createdAt
		description
		featuredMedia {
			...Media_media
		}
		fields
		handle
		indexedAt
		locale
		media {
			...Media_media
		}
		metafields {
			...Metafield_metafield
		}
		nacelleEntryId
		options {
			...ProductOption_productOption
		}
		productEntryId
		published
		seo {
			...SEO_seo
		}
		sourceEntryId
		sourceId
		title
		updatedAt
	}
`;
