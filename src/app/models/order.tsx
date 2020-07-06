import { IProduct } from './product';

export interface IOrder {
  id: string;
  recipientName: string;
  recipientAddress: string;
  recipientPhone: string;
  placementDate: Date;
  status: string;
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

export interface IOrderFormValues extends Partial<IOrder> {}

export class OrderFormValues implements IOrderFormValues {
  id?: string = undefined;
  recipientName: string = '';
  recipientAddress: string = '';
  recipientPhone: string = '';
  placementDate?: Date = undefined;
  status: string = '';

  constructor(init?: IOrderFormValues) {
    if (init && init.placementDate) {
      // Do NOT FUCKING CHANGE OBJECT OUTSIDE MOBX
      //init.time=init.date
      this.placementDate = init.placementDate;
    }
    Object.assign(this, init);
  }
}
