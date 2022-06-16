import { writable, get, derived } from 'svelte/store';
import { get as getKey, set as setKey } from 'idb-keyval';
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
	setKey('cart', get(lineItems));
};

export const addItem = (payload) => {
	const $lineItems = get(lineItems);
	const index = $lineItems.findIndex((lineItem) => {
		if (lineItem.variant.id === payload.variant.id) {
			return JSON.stringify(payload.metafields) === JSON.stringify(lineItem.metafields);
		}
		return false;
	});
	if (index === -1) {
		payload.id = `${payload.variant.id}::${uuid()}`;
		$lineItems.push(payload);
	} else {
		$lineItems.splice(index, 1, {
			...$lineItems[index],
			quantity: $lineItems[index].quantity + payload.quantity
		});
	}
	lineItems.set($lineItems);
	setKey('cart', get(lineItems));
};

export const removeItem = (payload) => {
	const $lineItems = get(lineItems);
	const index = $lineItems.findIndex((lineItem) => {
		return lineItem.id === payload;
	});
	if (index > -1) {
		$lineItems.splice(index, 1);
	}
	lineItems.set($lineItems);
	setKey('cart', get(lineItems));
};

export const updateItem = (payload) => {
	const $lineItems = get(lineItems);
	const index = $lineItems.findIndex((lineItem) => {
		return lineItem.id === payload;
	});
	if (index > 0) {
		$lineItems.splice(index, 1, {
			...$lineItems[index],
			...payload
		});
	}
	lineItems.set($lineItems);
	setKey('cart', get(lineItems));
};

export const incrementItem = (payload) => {
	const $lineItems = get(lineItems);
	const index = $lineItems.findIndex((lineItem) => {
		return lineItem.id === payload;
	});
	if (index > -1) {
		$lineItems.splice(index, 1, {
			...$lineItems[index],
			quantity: $lineItems[index].quantity + 1
		});
	}
	lineItems.set($lineItems);
	setKey('cart', get(lineItems));
};

export const decrementItem = (payload) => {
	const $lineItems = get(lineItems);
	const index = $lineItems.findIndex((lineItem) => {
		return lineItem.id === payload;
	});
	if (index > -1) {
		if ($lineItems[index].quantity === 1) {
			$lineItems.splice(index, 1);
		} else {
			$lineItems.splice(index, 1, {
				...$lineItems[index],
				quantity: $lineItems[index].quantity - 1
			});
		}
	}
	lineItems.set($lineItems);
	setKey('cart', get(lineItems));
};

export const clearCart = () => {
	lineItems.set([]);
	setKey('cart', get(lineItems));
};

// Actions
const initCart = async () => {
	const cachedCart = await getKey(cacheKey);
	if (cachedCart) lineItems.set(cachedCart);
};

// Init
if (typeof document !== 'undefined') {
	initCart();
}
