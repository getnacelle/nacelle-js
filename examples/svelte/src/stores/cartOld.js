import { writable } from 'svelte/store';
import { get, set } from 'idb-keyval';
import { v4 as uuid } from 'uuid';

export const lineItems = writable([]);
export const cacheKey = writable('cart');

export const cartCount = lineItems.reduce((acc, item) => acc + item.quantity, 0);
export const cartSubtotal = lineItems.reduce(
	(acc, item) => acc + item.variant.price * item.quantity,
	0
);

export const setLineItems = (payload) => {
	lineItems.set(payload);
};

export const addItem = (payload) => {
	lineItems.update((state) => {
		const index = state.findIndex((lineItem) => {
			if (lineItem.variant.id === payload.variant.id) {
				return JSON.stringify(payload.metafields) === JSON.stringify(lineItem.metafields);
			}
			return false;
		});
		if (index === -1) {
			payload.id = `${payload.variant.id}::${uuid()}`;
			state.lineItems.push(payload);
		} else {
			state.lineItems.splice(index, 1, {
				...state.lineItems[index],
				quantity: state.lineItems[index].quantity + payload.quantity
			});
			set('cart', state);
			return state;
		}
	});
};

export const remoteItem = (payload) => {
	lineItems.update((state) => {
		const index = state.findIndex((item) => item.id === payload);
		if (index > -1) {
			state.splice(index, 1);
		}
		set('cart', state);
		return state;
	});
};

export const updateItem = (payload) => {
	lineItems.update((state) => {
		const index = state.findIndex((item) => item.id === payload.id);
		if (index > -1) {
			state.splice(index, 1, {
				...state[index],
				...payload
			});
		}
		set('cart', state);
		return state;
	});
};

export const incrementItem = (payload) => {
	lineItems.update((state) => {
		const index = state.findIndex((item) => item.id === payload.id);
		if (index > -1) {
			if (state[index].quantity === 1) {
				state.splice(index, 1);
			} else {
				state.splice(index, 1, {
					...state[index],
					quantity: state[index].quantity - 1
				});
			}
		}
		set('cart', state);
		return state;
	});
};

export const clearCart = () => {
	set('cart', []);
	lineItems.set([]);
};

export const initCart = async () => {
	const cachedCart = await get(cacheKey);
	lineItems.set(cachedCart);
};
