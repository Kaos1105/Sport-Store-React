import axios, { AxiosResponse } from 'axios';
import { history } from '../..';
import { toast } from 'react-toastify';
import { IProduct } from '../models/product';
// import { IUser, IUserFormValues } from '../models/user';
// import { IProfile, IPhoto } from '../models/profile';
import { product as products } from '../common/sample/productSeedDb';

axios.defaults.baseURL = 'https://localhost:5001/api';

//add token to request header
axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem('jwt');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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

var tempTable = products;

const Product = {
  //list: (): Promise<IProduct[]> => requests.get('/products'),
  list: (): IProduct[] => tempTable,
  //details: (id: string) => requests.get(`/products/${id}`),
  details: (id: string) => tempTable.filter((x) => x.id != id),
  //create: (product: IProduct) => requests.post('/products', product),
  create: (product: IProduct) => ({ ...tempTable, product }),
  //update: (product: IProduct) => requests.put(`/products/${product.id}`, product),
  update: (product: IProduct) =>
    tempTable.map((x) => {
      if (x.id == product.id) x = product;
    }),
  //delete: (id: string) => requests.delete(`/products/${id}`),
  delete: (id: string) => tempTable.filter((x) => x.id != id),
};

export default {
  Product,
};
