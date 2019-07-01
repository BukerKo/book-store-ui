import {ACCESS_TOKEN, AUTH_BASE_URL, BASE_URL,} from '../constants/index';

interface Options {
    url: string,
    method: string,
    body?: string | any
}

const request = (options: Options) => {
    const headers: any = {};

    headers['Content-Type'] = 'application/json';

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers['Authorization'] = 'Bearer ' + localStorage.getItem(ACCESS_TOKEN);
    }

    const defaults = {headers: headers};

    let body: any = options.body;
    if (body instanceof FormData) {
        delete defaults.headers['Content-Type'];
    }

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

export function updateMainUserInformation(updateUserRequest: any) {
    return request({
        url: `${BASE_URL}/api/user/${updateUserRequest.id}`,
        method: 'PUT',
        body: JSON.stringify(updateUserRequest)
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

export function getOrders(getOrdersRequest: any) {
    return request({
        url: `${BASE_URL}/bookings?page=${getOrdersRequest.page}&size=${getOrdersRequest.size}`,
        method: 'GET',
    });

}

export function updateBook(updateBookRequest: any) {
    return request({
        url: `${BASE_URL}/books/${updateBookRequest.id}`,
        method: 'PUT',
        body: JSON.stringify(updateBookRequest)
    });
}

export function addBook(addBookRequest: any) {
    return request({
        url: `${BASE_URL}/books`,
        method: 'POST',
        body: JSON.stringify(addBookRequest)
    });
}

export function getUsers(getUsersRequest: any) {
    return request({
        url: `${BASE_URL}/api/user?page=${getUsersRequest.page}&size=${getUsersRequest.size}`,
        method: 'GET',
    });
}

export function deleteUsers(deleteUsersRequest: any) {
    return request({
        url: `${BASE_URL}/api/user/delete`,
        method: 'POST',
        body: JSON.stringify(deleteUsersRequest)
    });
}

export function uploadImage(image: any) {
    let form = new FormData();
    form.append('file', image);
    return request({
        url: `${BASE_URL}/uploadFile`,
        method: 'POST',
        body: form,
    });
}

export function getBookingsCount() {
    return request({
        url: `${BASE_URL}/bookings/totalCount`,
        method: 'GET'
    });
}
