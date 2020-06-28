import { IProduct } from '../../models/product';

export interface IProductOption {
  categoryOptions: string[];
  brandOptions: string[];
}

export interface ICategoryOptions {
  key: string;
  value: string;
  text: string;
}

export interface IBrandOptions {
  key: string;
  value: string;
  text: string;
}

export interface IOrderProductOptions {
  key: string;
  value: string;
  text: string;
}
