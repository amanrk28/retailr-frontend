import { getAuthToken } from '../utils/localStorage';

const { REACT_APP_SERVER_URL } = process.env;

const server_url = `${REACT_APP_SERVER_URL}`;

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

export const getProductListApi = searchString =>
  callAPI('get', `${store}/product${searchString || ''}`);
export const getProductApi = id => callAPI('get', `${store}/product/${id}`);
export const createProductApi = data =>
  callAPI('post', `${store}/product`, data);
export const updateProductApi = (id, data) =>
  callAPI('put', `${store}/product/${id}`, data);

export const getProductCategoriesApi = () =>
  callAPI('get', `${store}/product_categories`);

export const getCartItemsApi = () => callAPI('get', `${store}/cart`);
export const createCartItemApi = data => callAPI('post', `${store}/cart`, data);
export const updateCartItemApi = (id, data) =>
  callAPI('put', `${store}/cart/${id}`, data);
export const createOrderFromCartApi = data =>
  callAPI('post', `${store}/order_from_cart`, data);

// -------------- Auth API -------------------
const auth = '/auth';

export const signupApi = data => callAPI('post', `${auth}/signup`, data);
export const loginApi = data => callAPI('post', `${auth}/login`, data);
export const verifyTokenApi = data =>
  callAPI('post', `${auth}/verifytoken`, data);
export const updateUserApi = (id, data) =>
  callAPI('put', `${auth}/users/${id}`, data);

// -------------- Order API -------------------
const order = '/order';

export const getOrderListApi = searchString =>
  callAPI('get', `${order}/orders${searchString || ''}`);
export const getOrderItemApi = id => callAPI('get', `${order}/orders/${id}`);
export const updateOrderStatusApi = (id, data) =>
  callAPI('put', `${order}/orders/${id}`, data);
export const cancelOrderApi = id =>
  callAPI('get', `${order}/orders/${id}/cancel`);
