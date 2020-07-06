import { IProduct } from './product';

export interface IImport {
  id: string;
  wholesalerName: string;
  wholesalerAddress: string;
  wholesalerPhone: string;
  placementDate: Date;
  status: string;
  products: IProductImport[];
}

export interface IProductImport {
  product: IProduct;
  quantity: number;
}

export interface IImportEnvelope {
  imports: IImport[];
  resultCount: number;
}

export interface IImportFormValues extends Partial<IImport> {}

export class ImportFormValues implements IImportFormValues {
  id?: string = undefined;
  wholesalerName: string = '';
  wholesalerAddress: string = '';
  wholesalerPhone: string = '';
  placementDate?: Date = undefined;
  status: string = '';

  constructor(init?: IImportFormValues) {
    if (init && init.placementDate) {
      // Do NOT FUCKING CHANGE OBJECT OUTSIDE MOBX
      //init.time=init.date
      this.placementDate = init.placementDate;
    }
    Object.assign(this, init);
  }
}
