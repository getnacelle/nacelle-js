export default /* GraphQL */ `
	fragment VariantContent_variantContent on VariantContent {
		createdAt
		description
		featuredMedia {
			...Media_media
		}
		fields
		indexedAt
		locale
		media {
			...Media_media
		}
		metafields {
			...Metafield_metafield
		}
		nacelleEntryId
		productEntryId
		productHandle
		published
		selectedOptions {
			label
			name
			value
		}
		sourceEntryId
		sourceId
		swatchSrc
		title
		updatedAt
		variantEntryId
	}
`;
