import {ACCESS_TOKEN, AUTH_BASE_URL, BASE_URL,} from '../constants/index';

interface Options {
    url: string,
    method: string,
    body?: string
}

const request = (options: Options) => {
    const headers: any = {};

    headers['Content-Type'] = 'application/json';
    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers['Authorization'] = 'Bearer ' + localStorage.getItem(ACCESS_TOKEN);
    }

    const defaults = {headers: headers};

    return fetch(options.url, {...defaults, ...options})
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

export function login(loginRequest: any) {
    return request({
        url: AUTH_BASE_URL + "/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest: any) {
    return request({
        url: AUTH_BASE_URL + "/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function getBooks(getBooksRequest: any) {
    return request({
        url: `${BASE_URL}/books?page=${getBooksRequest.page}&size=${getBooksRequest.size}`,
        method: 'GET',
    });
}

export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: `${BASE_URL}/api/user/me`,
        method: 'GET'
    });
}

export function getVisibleBooksCount() {
    return request({
        url: `${BASE_URL}/books/search/countBooksByVisibleTrue`,
        method: 'GET',
    });
}

export function getVisibleBooks(getBooksRequest: any) {
    return request({
        url: `${BASE_URL}/books/search/findBooksByVisibleTrue?page=${getBooksRequest.page}&size=${getBooksRequest.size}`,
        method: 'GET',
    });
}

export function updateUser(updateUserRequest: any) {
    return request({
        url: `${BASE_URL}/api/user/update`,
        method: 'POST',
        body: JSON.stringify(updateUserRequest)
    });
}

export function addOrder(addOrderRequest: any) {
    return request({
        url: `${BASE_URL}/bookings`,
        method: 'POST',
        body: JSON.stringify(addOrderRequest)
    });
}

export function getOrders() {
    return request({
        url: `${BASE_URL}/bookings`,
        method: 'GET',
    });

}
