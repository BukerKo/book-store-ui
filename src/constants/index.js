export const BASE_URL = 'http://localhost:8090';
export const AUTH_BASE_URL = BASE_URL + '/api/auth';
export const ACCESS_TOKEN = 'accessToken';
export const ROLE = 'authorities';
export const CARDS_ON_PAGE_SIZE = 6;
export const USER_ROLE = 'ROLE_USER';
export const CURRENT_ROLE = 'currentRole';
export const CURRENT_USERNAME = 'currentUser';
export const BOOKS_IN_CART = "cart";

export const USERNAMEOREMAIL_REGEXP = "^[a-zA-Z0-9_.@-]+$";
export const PASSWORD_REGEXP = "^[a-zA-Z0-9_.@-]+$";
export const DATE_REGEXP = "^([0-2][0-9]|(3)[0-1])(-)(((0)[0-9])|((1)[0-2]))(-)\\d{4}$";
export const EMAIL_REGEXP = "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])";
export const INTEGER_REGEXP = "^\\d+$";
export const DOUBLE_REGEXP = "^[0-9]+(\\.[0-9]+)?$";
export const BOOKTITLE_REGEXP = "^[a-zA-Z0-9]+$";
