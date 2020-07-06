import { observable, action, runInAction, computed, reaction } from 'mobx';
import { SyntheticEvent } from 'react';
import agent from '../api/agent';
import { history } from '../..';
import { toast } from 'react-toastify';
import { RootStore } from './rootStore';
import { IShipment } from '../models/shipment';
import { shipmentStatusOptions } from '../common/sample/shipmentStatusOptions';
import { statusOptions } from '../common/sample/statusOptions';

const LIMIT = 5;

export default class ImportShipmentStore {
  _rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;

    reaction(
      () => this.predicate.keys(),
      () => {
        if (this.predicate.get('final') === 'true') {
          this.page = 1;
          this.shipmentRegistry.clear();
          this.loadShipments();
          this.predicate.clear();
        } else if (this.predicate.get('final') === 'false') {
          this.page = 1;
          this.shipmentRegistry.clear();
          this.loadShipments();
          this.predicate.clear();
        }
      }
    );
  }

  //Observable map
  @observable shipmentRegistry = new Map();

  //List
  @observable loadingInitial = false;

  //Details
  @observable selectedShipment: IShipment | null = null;

  //Create
  @observable submitting = false;

  //Delete
  @observable targetDelete = '';

  //Paging
  @observable shipmentCount = 0;
  @observable page = 1;

  @computed get totalPages() {
    return Math.ceil(this.shipmentCount / LIMIT);
  }

  @action setPages = (page: number) => {
    this.page = page;
  };

  //Filtering
  @observable predicate = new Map();
  @action setPredicate = (predicate: string, value: string | number) => {
    //this.predicate.clear();
    this.predicate.set(predicate, value);
  };
  @computed get axiosParams() {
    const params = new URLSearchParams();
    params.append('limit', String(LIMIT));
    params.append('offset', `${this.page ? (this.page - 1) * LIMIT : 0}`);
    this.predicate.forEach((value, key) => {
      if (key !== 'final') params.append(key, value);
    });
    return params;
  }

  //Filtering option

  //List
  @action loadShipments = async () => {
    this.loadingInitial = true;

    try {
      const shipmentEnvelope = await agent.ImportShipment.list(this.axiosParams);
      const { shipments, resultCount } = shipmentEnvelope;
      runInAction('loading importShipments', () => {
        this.shipmentRegistry.clear();
        this.shipmentCount = resultCount;
        shipments.forEach((shipment) => {
          this.shipmentRegistry.set(shipment.id, shipment);
        });
      });
    } catch (error) {
      toast.error('Problem loading importShipments');
      console.log(error);
    } finally {
      runInAction('finished loading', () => {
        this.loadingInitial = false;
      });
    }
  };

  //Detail
  @action loadShipment = async (id: string) => {
    let shipment = this.getShipment(id);
    if (shipment) {
      this.selectedShipment = shipment;
      return shipment;
    } else {
      this.loadingInitial = true;
      try {
        shipment = await agent.ImportShipment.details(id);
        runInAction('getting detail shipment', () => {
          this.selectedShipment = shipment;
          this.shipmentRegistry.set(shipment.id, shipment);
        });
        return shipment;
      } catch (error) {
        toast.error('Problem load shipment');
        console.log(error);
      } finally {
        runInAction('finish getting detail shipment', () => {
          this.loadingInitial = false;
        });
      }
    }
  };

  getShipment = (id: string) => {
    return this.shipmentRegistry.get(id);
  };

  //Create
  @action createShipment = async (shipment: IShipment) => {
    this.submitting = true;
    try {
      await agent.ImportShipment.create(shipment);
      runInAction('creating shipment', () => {
        this.shipmentRegistry.set(shipment.id, shipment);
      });
      history.push(`/importShipment/${shipment.id}`);
    } catch (error) {
      toast.error('Problem submitting data');
      console.log(error);
    } finally {
      runInAction('finished creating', () => {
        this.submitting = false;
      });
    }
  };

  //Edit
  @action editShipment = async (shipment: IShipment) => {
    this.submitting = true;
    try {
      let currentImport = await agent.Imports.details(shipment.importID);
      if (shipment.shipmentStatus === shipmentStatusOptions[0].value) {
        currentImport.status = statusOptions[0].value;
        this._rootStore.importStore.editImport(currentImport);
      } else if (shipment.shipmentStatus === shipmentStatusOptions[2].value) {
        currentImport.status = statusOptions[2].value;
        this._rootStore.importStore.editImport(currentImport);
      }
      await agent.ImportShipment.update(shipment);
      runInAction('editing shipment', () => {
        this.selectedShipment = shipment;
        this.shipmentRegistry.set(shipment.id, shipment);
      });
      history.push(`/importShipment/${shipment.id}`);
    } catch (error) {
      toast.error('Problem editing data');
      console.log(error);
    } finally {
      runInAction('finished editing', () => {
        this.submitting = false;
      });
    }
  };

  //Delete
  @action deleteShipment = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.targetDelete = event.currentTarget.name;
    try {
      await agent.ImportShipment.delete(id);
      runInAction('deleting shipment', () => {
        this.shipmentRegistry.delete(id);
      });
    } catch (error) {
      toast.error('Problem deleting data');
      console.log(error);
    } finally {
      runInAction('finished deleting', () => {
        this.submitting = false;
        this.targetDelete = '';
      });
    }
  };
}
//export default createContext(new ActivityStore());
