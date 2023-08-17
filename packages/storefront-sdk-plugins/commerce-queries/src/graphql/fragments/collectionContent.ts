export default /* GraphQL */ `
	fragment CollectionContent_collectionContent on CollectionContent {
		__typename
		collectionEntryId
		createdAt
		description
		featuredMedia {
			...Media_media
		}
		fields
		handle
		indexedAt
		locale
		metafields {
			...Metafield_metafield
		}
		nacelleEntryId
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
