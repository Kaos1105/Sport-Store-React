import ProductStore from './productStore';
import { createContext } from 'react';
import { configure } from 'mobx';
import CommonStore from './commonStore';
import ModalStore from './modalStore';

configure({ enforceActions: 'always' });

export class RootStore {
  productStore: ProductStore;
  commonStore: CommonStore;
  modalStore: ModalStore;

  constructor() {
    this.productStore = new ProductStore(this);
    this.commonStore = new CommonStore(this);
    this.modalStore = new ModalStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
