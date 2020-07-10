import ProductStore from './productStore';
import { createContext } from 'react';
import { configure } from 'mobx';
import CommonStore from './commonStore';
import ModalStore from './modalStore';
import ProductOptions from './productOptionsStore';
import UserStore from './userStore';
import OrderStore from './orderStore';
import OrderOptionsStore from './orderProductOptionsStore';
import ImportStore from './importStore';
import ShipmentOptionsStore from './shipmentOptionsStore';
import ImportShipmentStore from './importShipmentStore';
import OrderShipmentStore from './orderShipmentStore';
import IncomeStore from './incomeStore';
import { RevealContentProps } from 'semantic-ui-react';
import RevenueStore from './revenueStore';

configure({ enforceActions: 'always' });

export class RootStore {
  productStore: ProductStore;
  productOptions: ProductOptions;
  commonStore: CommonStore;
  modalStore: ModalStore;
  userStore: UserStore;
  orderStore: OrderStore;
  importStore: ImportStore;
  orderOptions: OrderOptionsStore;
  shipmentOptions: ShipmentOptionsStore;
  importShipmentStore: ImportShipmentStore;
  orderShipmentStore: OrderShipmentStore;
  incomeStore: IncomeStore;
  revenueStore: RevenueStore;

  constructor() {
    this.productStore = new ProductStore(this);
    this.commonStore = new CommonStore(this);
    this.modalStore = new ModalStore(this);
    this.productOptions = new ProductOptions(this);
    this.userStore = new UserStore(this);
    this.orderStore = new OrderStore(this);
    this.orderOptions = new OrderOptionsStore(this);
    this.importStore = new ImportStore(this);
    this.shipmentOptions = new ShipmentOptionsStore(this);
    this.importShipmentStore = new ImportShipmentStore(this);
    this.orderShipmentStore = new OrderShipmentStore(this);
    this.incomeStore = new IncomeStore(this);
    this.revenueStore = new RevenueStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
