const API_URL = 'http://localhost:4000';

export async function sendRequest(
	method: string,
	path: string,
	token: string | null | undefined,
	body: Record<string, unknown> | null | undefined,
	onError: Function,
) {
	const fetchConfig: RequestInit = {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
	};
	if (token) {
		fetchConfig.headers = { ...fetchConfig.headers, Authorization: `Bearer ${token}` };
	}
	if (body) {
		fetchConfig.body = JSON.stringify(body);
	}
	const res = await fetch(`${API_URL}${path}`, fetchConfig);
	if (!res.ok) {
		const errorMsg = await res.text();
		onError(errorMsg);
		return null;
	}
	if (res.status === 204) {
		return true;
	}
	return res.json();
}
