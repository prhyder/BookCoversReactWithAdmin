import { BehaviorSubject } from "rxjs";
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from '../helpers/fetch-wrapper';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(typeof window === undefined && JSON.parse(localStorage.getItem('user')));

export const userService = {
	user: userSubject.asObservable(),
	get userValue () { return userSubject.value },
	login,
	logout,
	getAll
};

function login(username, password) {
	return fetchWrapper.post(`${publicRuntimeConfig.apiUrl}/accounts/login`, {"email": username, "password": password })
		.then(user => {
			// Publish user to subscribers and store in local storage to stay logged in.
			userSubject.next(user);
			localStorage.setItem('user', JSON.stringify(user));

			return user;
		});	
}

function logout() {
	// Remove user from local storage, publish null to user subscribers, and redirect to login.
	localStorage.removeItem('user');
	userSubject.next(null);
	Router.push('/login');
}

function getAll() {
	return fetchWrapper.get(baseUrl);
}