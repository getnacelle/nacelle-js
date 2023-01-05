function getFetchPayload(
	data: object,
	responseOptions: { status: number } = {
		status: 200
	}
): Response {
	const headers = new Headers();
	headers.append('content-type', 'application/json');
	return new Response(JSON.stringify({ ...data }), {
		headers,
		...responseOptions
	});
}
export default getFetchPayload;
