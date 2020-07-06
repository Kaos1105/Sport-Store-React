export interface IShipment {
  id: string;
  deliverDate: Date;
  importID: string;
  orderID: string;
  shipmentStatus: string;
  shipmentCompany: string;
  shipmentID: string;
}

export interface IShipmentEnvelope {
  shipments: IShipment[];
  resultCount: number;
}

export interface IShipmentFormValue extends Partial<IShipment> {}

export class ImShipmentFormValue implements IShipmentFormValue {
  id?: string = undefined;
  deliverDate?: Date = undefined;
  importID: string = '';
  shipmentStatus: string = '';
  shipmentCompany: string = '';
  shipmentID: string = '';

  constructor(init?: IShipmentFormValue) {
    if (init && init.deliverDate) {
      // Do NOT FUCKING CHANGE OBJECT OUTSIDE MOBX
      //init.time=init.date
      this.deliverDate = init.deliverDate;
    }
    Object.assign(this, init);
  }
}

export class OrShipmentFormValue implements IShipmentFormValue {
  id?: string = undefined;
  deliverDate?: Date = undefined;
  orderID: string = '';
  shipmentStatus: string = '';
  shipmentCompany: string = '';
  shipmentID: string = '';

  constructor(init?: IShipmentFormValue) {
    if (init && init.deliverDate) {
      // Do NOT FUCKING CHANGE OBJECT OUTSIDE MOBX
      //init.time=init.date
      this.deliverDate = init.deliverDate;
    }
    Object.assign(this, init);
  }
}
