import { getAuthToken } from '../utils/localStorage';
const { SERVER_URL, SERVER_PORT } = process.env;

const server_url = `${SERVER_URL}:${SERVER_PORT}`;

const callAPI = async (method, url, data = {}) => {
  const token = getAuthToken();
  let headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers = {
      ...headers,
      Authorization: `Token ${token}`,
    };
  }
  const options = {
    method,
    headers,
  };
  if (method !== 'get') {
    options.body = JSON.stringify(data);
  }
  return fetch(server_url + url, options).then(res => res.json());
};

// --------------- Store API -----------------
const store = '/store';

export const getProductsApi = () => callAPI('get', `${store}/product`);
export const createProductApi = data =>
  callAPI('post', `${store}/product`, data);
export const updateProductApi = (id, data) =>
  callAPI('put', `${store}/product/${id}`, data);

export const getProductCategoriesApi = () =>
  callAPI('get', `${store}/product_categories`);

export const createCartItemApi = data => callAPI('post', `${store}/cart`, data);
export const updateCartItemApi = (id, data) =>
  callAPI('put', `${store}/cart/${id}`, data);

// -------------- Auth API -------------------
const auth = '/auth';

export const signupApi = data => callAPI('post', `${auth}/signup`, data);
export const loginApi = data => callAPI('post', `${auth}/verify_user`, data);