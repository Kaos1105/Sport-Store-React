import { IProduct } from './product';

export interface IOrder {
  id: string;
  recipientName: string;
  recipientAddress: string;
  recipientPhone: string;
  placementDate: Date;
  products: IProductOrder[];
}

export interface IProductOrder {
  product: IProduct;
  quantity: number;
}

export interface IOrderEnvelope {
  orders: IOrder[];
  resultCount: number;
}
