import crypto from 'node:crypto';

Object.defineProperty(global.self, 'crypto', {
	value: {
		subtle: crypto.webcrypto.subtle
	}
});
