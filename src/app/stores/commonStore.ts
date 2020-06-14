import { RootStore } from './rootStore';
import { observable, action } from 'mobx';

export default class CommonStore {
  _rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;
  }
  @observable appLoaded = false;

  @action setAppLoaded = () => {
    this.appLoaded = true;
  };
}
