import { get, set, del } from 'idb-keyval';
import checkoutClient from '~/services/shopifyCheckout';
import { lineItems, setLineItems } from './cart';

export const initCheckout = async () => {
	try {
		const checkoutId = await get('checkoutId');
		if (checkoutId) {
			const checkout = checkoutClient.get({
				id: checkoutId
			});
			if (checkout?.completed) {
				await del('checkoutId');
				setLineItems([]);
			}
		}
	} catch (err) {
		console.error(err);
	}
};

export const processCheckout = async () => {
	try {
		const cartItems = lineItems.map((lineItem) => ({
			quantity: lineItem.quantity,
			variantId: lineItem.variant.id
		}));
		const checkoutData = await checkoutClient.process({ cartItems });
		await set('checkoutId', checkoutData.id);
		if (checkoutData.url) {
			window.location.href = checkoutData.url;
		}
	} catch (err) {
		console.error(err);
	}
};
