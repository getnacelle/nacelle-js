export default /* GraphQL */ `
	fragment Product_product on Product {
		__typename
		availableForSale
		createdAt
		indexedAt
		metafields {
			...Metafield_metafield
		}
		nacelleEntryId
		productType
		sourceEntryId
		sourceId
		tags
		updatedAt
		vendor
		variants {
			...Variant_variant
		}
		content {
			...ProductContent_productContent
		}
	}
`;
