export default /* GraphQL */ `
	fragment Variant_variant on Variant {
		availableForSale
		compareAtPrice
		content {
			...VariantContent_variantContent
		}
		createdAt
		indexedAt
		metafields {
			...Metafield_metafield
		}
		nacelleEntryId
		price
		priceCurrency
		priceRules {
			...ProductPriceRules_productPriceRules
		}
		productEntryId
		productHandle
		quantityAvailable
		sku
		sourceEntryId
		sourceId
		updatedAt
		weight
		weightUnit
	}
`;
