function getFetchPayload(
	data: object,
	responseOptions: { status: number; headers?: Record<string, string> } = {
		status: 200
	}
): Response {
	const headers = new Headers();
	headers.append('content-type', 'application/json');
	if (responseOptions.headers) {
		for (const [key, value] of Object.entries(responseOptions.headers)) {
			headers.append(key, value);
		}
	}
	return new Response(JSON.stringify({ ...data }), {
		headers,
		...responseOptions
	});
}
export default getFetchPayload;
