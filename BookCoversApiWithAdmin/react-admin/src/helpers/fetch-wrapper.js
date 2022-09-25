import getConfig from 'next/config';
import { userService } from '../services/user.service';

const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
	get,
	post,
	put,
	delete: _delete
};

async function get(url) {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(url)
	};
	const response = await fetch(url, requestOptions);
	return handleResponse(response);
}

async function post(url, body) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', ...authHeader(url) },
		credentials: 'include',
		body: JSON.stringify(body)
	};
	const response = await fetch(url, requestOptions);
	return handleResponse(response);
}

async function put(url, body) {
	const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        body: JSON.stringify(body)
    };
    const response = await fetch(url, requestOptions);
	return handleResponse(response);
}

async function _delete(url) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(url)
    };
    const response = await fetch(url, requestOptions);
	return handleResponse(response);
}

function authHeader(url) {
	const user = userService.userValue;
	const isLoggedIn = user && user.token;
	const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
	if (isLoggedIn && isApiUrl) {
		return { Authorization: `Bearer ${user.token}` };
	}
	else {
		return {};
	}
}

async function handleResponse(response) {
	const text = await response.text();
	const data = text && JSON.parse(text);

	if (!response.ok) {
		if ([401, 403].includes(response.status) && userService.userValue) {
			userService.logout();
		}

		const error = (data && data.errorMessage) || response.statusText;
		return Promise.reject(error);
	}
	return data;
}