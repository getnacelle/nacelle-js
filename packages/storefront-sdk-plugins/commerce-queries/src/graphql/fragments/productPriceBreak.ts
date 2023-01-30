export default /* GraphQL */ `
	fragment ProductPriceBreak_productPriceBreak on PriceBreak {
		metafields {
			...Metafield_metafield
		}
		price
		quantityMax
		quantityMin
	}
`;
