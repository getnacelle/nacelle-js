export type AfterCallback<T> = (data: T) => T;

export type AfterCallbackWithId<T> = {
	[id: string]: AfterCallback<T>;
};

export type AfterSubscriptions = Record<string, AfterCallbackWithId<unknown>>;
