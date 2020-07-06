import { observable, action, runInAction } from 'mobx';
import agent from '../api/agent';
import { RootStore } from './rootStore';
import { toast } from 'react-toastify';
import { IShipmentIdOptions } from '../common/sample/productOptions';

export default class ShipmentOptionsStore {
  _rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;
  }

  //List
  @observable loadingOptions = false;

  @observable importIdRegistry = new Array<IShipmentIdOptions>();

  @observable orderIdRegistry = new Array<IShipmentIdOptions>();
  //List
  @action loadOptions = async () => {
    this.loadingOptions = true;
    try {
      const shipmentOptions = await agent.ShipmentOptions.list();
      const { importFilterID, orderFilterID } = shipmentOptions;
      runInAction('loading options', () => {
        this.importIdRegistry = [];
        importFilterID.forEach((id: string) => {
          let tempImportId: IShipmentIdOptions = { key: id, value: id, text: id };
          this.importIdRegistry.push(tempImportId);
        });

        this.orderIdRegistry = [];
        orderFilterID.forEach((id: string) => {
          let tempOrderId: IShipmentIdOptions = { key: id, value: id, text: id };
          this.orderIdRegistry.push(tempOrderId);
        });
      });
    } catch (error) {
      console.log(error);
      toast.error('Problem loading Id options');
    } finally {
      runInAction('finished loading', () => {
        this.loadingOptions = false;
      });
    }
  };
}
//export default createContext(new ActivityStore());
