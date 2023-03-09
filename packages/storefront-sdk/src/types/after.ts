export type AfterCallback<T> = (data: T) => T;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AfterCallbackWithId<T> = {
	[id: string]: AfterCallback<T>;
};

export type AfterSubscriptions = Record<string, AfterCallbackWithId<unknown>>;
