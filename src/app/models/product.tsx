export interface IProductEnvelope {
  products: IProduct[];
}

export interface IProduct {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  importPrice: number;
  stock: number;
  dateAdded: Date;
}
export interface IProductFormValues extends Partial<IProduct> {}

export class ProductFormValues implements IProductFormValues {
  id?: string = undefined;
  name: string = '';
  category: string = '';
  description: string = '';
  brand: string = '';
  price: number = 0;
  importPrice: number = 0;
  stock: number = 0;
  dateAdded?: Date = undefined;

  constructor(init?: IProductFormValues) {
    if (init && init.dateAdded) {
      // Do NOT FUCKING CHANGE OBJECT OUTSIDE MOBX
      //init.time=init.date
      this.dateAdded = init.dateAdded;
    } else {
      var today = new Date();
      var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
      var result = new Date(Date.parse(date));
      this.dateAdded = result;
    }
    Object.assign(this, init);
  }
}
