import axios, { AxiosResponse } from 'axios';
import { history } from '../..';
import { toast } from 'react-toastify';
import { IProduct, IProductEnvelope, IPhoto } from '../models/product';
import { IProductOption } from '../common/sample/productOptions';
import { IUser, IUserFormValues } from '../models/user';
import { IOrderEnvelope, IOrder } from '../models/order';
// import { IUser, IUserFormValues } from '../models/user';
// import { IProfile, IPhoto } from '../models/profile';

axios.defaults.baseURL = 'http://localhost:8080/SportsStore-1.0/rest';

//add token to request header
// axios.interceptors.request.use(
//   (config) => {
//     const token = window.localStorage.getItem('jwt');
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

//error handle from response
axios.interceptors.response.use(undefined, (error) => {
  console.log(error);
  if (error.message === 'Network Error' && !error.response) {
    toast.error('NETWORK ERROR-can not connect to sever network!');
  }
  const { status, config } = error.response;
  if (status === 404) {
    history.push('/notfound');
  }
  if (status === 400 && config.method === 'get' /*&& data.errors.hasOwnProperty('id')*/) {
    history.push('/notfound');
  }
  if (status === 500) {
    toast.error('SEVER ERROR-check the terminal error for more info!');
  }
  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) => setTimeout(() => resolve(response), ms));

// const requests = {
//   get: (url: string) => axios.get(url).then(responseBody),
//   post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
//   put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
//   delete: (url: string) => axios.delete(url).then(responseBody),
// };

const requests = {
  get: (url: string) => axios.get(url).then(sleep(500)).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(sleep(500)).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(sleep(500)).then(responseBody),
  delete: (url: string) => axios.delete(url).then(sleep(500)).then(responseBody),
  postForm: (url: string, file: Blob) => {
    let formData = new FormData();
    formData.append('File', file);
    return axios
      .post(url, formData, { headers: { 'Content-type': 'multipart/form-data' } })
      .then(responseBody);
  },
};

const Product = {
  list: (params: URLSearchParams): Promise<IProductEnvelope> =>
    axios.get('/products', { params: params }).then(sleep(500)).then(responseBody),
  details: (id: string) => requests.get(`/products/${id}`),
  create: (product: IProduct) => requests.post('/products', product),
  update: (product: IProduct) => requests.put(`/products/${product.id}`, product),
  delete: (id: string) => requests.delete(`/products/${id}`),
};

const Photo = {
  uploadPhoto: (photo: Blob, productId: string): Promise<IPhoto> =>
    requests.postForm(`/photo/${productId}`, photo),
  setMainPhoto: (id: string) => requests.put(`/photo/${id}`, {}),
  deletePhoto: (id: string) => requests.delete(`/photo/${id}`),
};

const ProductOptions = {
  list: (): Promise<IProductOption> => requests.get('/productOptions'),
};

const Users = {
  login: (user: IUserFormValues): Promise<IUser> => requests.post(`/users/login`, user),
  register: (user: IUserFormValues): Promise<IUser> => requests.post(`/users/register`, user),
  edit: (user: IUserFormValues) => requests.put(`/users/`, user),
  delete: (email: String) => requests.delete(`/users/${email}`),
  getEmployee: (): Promise<IUser[]> => requests.get('/users'),
};

const Orders = {
  list: (params: URLSearchParams): Promise<IOrderEnvelope> =>
    axios.get('/orders', { params: params }).then(sleep(500)).then(responseBody),
  details: (id: string) => requests.get(`/orders/${id}`),
  create: (order: IOrder) => requests.post('/orders', order),
  update: (order: IOrder) => requests.put(`/orders/${order.id}`, order),
  delete: (id: string) => requests.delete(`/orders/${id}`),
};

export default {
  Product,
  ProductOptions,
  Photo,
  Users,
  Orders,
};
