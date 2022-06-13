import { writable, get, derived } from 'svelte/store';
import { /*get,*/ set } from 'idb-keyval';
import { v4 as uuid } from 'uuid';

// State
export const cacheKey = 'cart';
export const lineItems = writable([]);

// Getters
export const cartCount = derived(lineItems, ($lineItems) =>
	$lineItems.reduce((acc, item) => acc + item.quantity, 0)
);
export const cartSubtotal = derived(lineItems, ($lineItems) =>
	$lineItems.reduce((acc, item) => acc + item.variant.price * item.quantity, 0)
);

// Mutations
export const setLineItems = (payload) => {
	lineItems.set(payload);
	set('cart', get(lineItems));
};

export const addItem = (payload) => {
	const index = lineItems.findIndex((lineItem) => {
		if (lineItem.variant.id === payload.variant.id) {
			return JSON.stringify(payload.metafields) === JSON.stringify(lineItem.metafields);
		}
		return false;
	});
	if (index === -1) {
		payload.id = `${payload.variant.id}::${uuid()}`;
		lineItems.set([...lineItems, payload]);
	} else {
		lineItems.set(
			...lineItems.slice(0, index),
			{
				...lineItems[index],
				quantity: lineItems[index].quantity + payload.quantity
			},
			...lineItems.slice(index)
		);
	}
	set('cart', get(lineItems));
};
