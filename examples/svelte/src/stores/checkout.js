import { get } from 'svelte/store';
import { get as getKey, set as setKey, del as delKey } from 'idb-keyval';
import checkoutClient from '~/services/shopifyCheckout';
import { lineItems, setLineItems } from './cart';

// State
export const cacheKey = 'checkoutId';

// Actions
export const initCheckout = async () => {
	try {
		const checkoutId = await getKey(cacheKey);
		if (checkoutId) {
			const checkout = checkoutClient.get({
				id: checkoutId
			});
			if (checkout?.completed) {
				await delKey(cacheKey);
				setLineItems([]);
			}
		}
	} catch (err) {
		console.error(err);
	}
};

export const processCheckout = async () => {
	try {
		const $lineItems = get(lineItems);
		const cartItems = $lineItems.map((lineItem) => ({
			quantity: lineItem.quantity,
			variantId: lineItem.variant.id
		}));
		const checkoutData = await checkoutClient.process({ cartItems });
		await setKey(cacheKey, checkoutData.id);
		if (checkoutData.url) {
			window.location.href = checkoutData.url;
		}
	} catch (err) {
		console.error(err);
	}
};

// Init
if (typeof document !== 'undefined') {
	initCheckout();
}
