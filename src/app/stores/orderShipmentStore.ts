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

export default class OrderShipmentStore {
  _rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;

    reaction(
      () => this.predicate.get('final'),
      () => {
        if (this.predicate.get('final') === 'true') {
          this.page = 1;
          this.shipmentRegistry.clear();
          this.loadShipments();
          //this.predicate.clear();
        } else if (this.predicate.get('final') === 'false') {
          this.page = 1;
          this.predicate.clear();
          this.shipmentRegistry.clear();
          this.loadShipments();
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
      const shipmentEnvelope = await agent.OrderShipment.list(this.axiosParams);
      const { shipments, resultCount } = shipmentEnvelope;
      runInAction('loading orderShipments', () => {
        this.shipmentRegistry.clear();
        this.shipmentCount = resultCount;
        shipments.forEach((shipment) => {
          this.shipmentRegistry.set(shipment.id, shipment);
        });
      });
    } catch (error) {
      toast.error('Problem loading orderShipments');
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
        shipment = await agent.OrderShipment.details(id);
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
      await agent.OrderShipment.create(shipment);
      runInAction('creating shipment', () => {
        this.shipmentRegistry.set(shipment.id, shipment);
      });
      history.push(`/orderShipment/${shipment.id}`);
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
      let currentOrder = await agent.Orders.details(shipment.orderID);
      if (shipment.shipmentStatus === shipmentStatusOptions[0].value) {
        currentOrder.status = statusOptions[0].value;
        this._rootStore.orderStore.editOrder(currentOrder);
      } else if (shipment.shipmentStatus === shipmentStatusOptions[2].value) {
        currentOrder.status = statusOptions[2].value;
        this._rootStore.orderStore.editOrder(currentOrder);
      }
      await agent.OrderShipment.update(shipment);
      runInAction('editing shipment', () => {
        this.selectedShipment = shipment;
        this.shipmentRegistry.set(shipment.id, shipment);
      });
      history.push(`/orderShipment/${shipment.id}`);
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
      await agent.OrderShipment.delete(id);
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
