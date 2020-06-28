import ProductStore from './productStore';
import { createContext } from 'react';
import { configure } from 'mobx';
import CommonStore from './commonStore';
import ModalStore from './modalStore';
import ProductOptions from './productOptionsStore';
import UserStore from './userStore';
import OrderStore from './orderStore';
import OrderOptionsStore from './orderProductOptionsStore';

configure({ enforceActions: 'always' });

export class RootStore {
  productStore: ProductStore;
  productOptions: ProductOptions;
  commonStore: CommonStore;
  modalStore: ModalStore;
  userStore: UserStore;
  orderStore: OrderStore;
  orderOptions: OrderOptionsStore;

  constructor() {
    this.productStore = new ProductStore(this);
    this.commonStore = new CommonStore(this);
    this.modalStore = new ModalStore(this);
    this.productOptions = new ProductOptions(this);
    this.userStore = new UserStore(this);
    this.orderStore = new OrderStore(this);
    this.orderOptions = new OrderOptionsStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
