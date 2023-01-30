export default /* GraphQL */ `
	fragment ProductPriceRules_productPriceRules on PriceRule {
		comparedAtPrice
		country
		id
		metafields {
			...Metafield_metafield
		}
		price
		priceBreaks {
			...ProductPriceBreak_productPriceBreak
		}
		priceCurrency
		title
	}
`;
