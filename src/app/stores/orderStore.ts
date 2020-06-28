import { observable, action, runInAction, computed, reaction } from 'mobx';
import { SyntheticEvent } from 'react';
import agent from '../api/agent';
import { history } from '../..';
import { toast } from 'react-toastify';
import { RootStore } from './rootStore';
import { IOrder } from '../models/order';

const LIMIT = 5;

export default class OrderStore {
  _rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;

    reaction(
      () => this.predicate.keys(),
      () => {
        if (this.predicate.get('final') === 'true') {
          this.page = 1;
          this.orderRegistry.clear();
          this.loadOrders();
          this.predicate.clear();
        } else if (this.predicate.get('final') === 'false') {
          this.page = 1;
          this.orderRegistry.clear();
          this.loadOrders();
          this.predicate.clear();
        }
      }
    );
  }

  //Observable map
  @observable orderRegistry = new Map();

  //List
  @observable loadingInitial = false;

  //Details
  @observable selectedOrder: IOrder | null = null;

  //Create
  @observable submitting = false;

  //Delete
  @observable targetDelete = '';

  //Paging
  @observable orderCount = 0;
  @observable page = 1;

  @computed get totalPages() {
    return Math.ceil(this.orderCount / LIMIT);
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
  @action loadOrders = async () => {
    this.loadingInitial = true;

    try {
      const orderEnvelope = await agent.Orders.list(this.axiosParams);
      const { orders, resultCount } = orderEnvelope;
      runInAction('loading orders', () => {
        this.orderRegistry.clear();
        this.orderCount = resultCount;
        orders.forEach((order) => {
          this.orderRegistry.set(order.id, order);
        });
      });
    } catch (error) {
      toast.error('Problem loading orders');
      console.log(error);
    } finally {
      runInAction('finished loading', () => {
        this.loadingInitial = false;
      });
    }
  };

  //Detail
  @action loadOrder = async (id: string) => {
    let order = this.getOrder(id);
    if (order) {
      this.selectedOrder = order;
      return order;
    } else {
      this.loadingInitial = true;
      try {
        order = await agent.Orders.details(id);
        runInAction('getting detail order', () => {
          this.selectedOrder = order;
          this.orderRegistry.set(order.id, order);
        });
        return order;
      } catch (error) {
        toast.error('Problem load order');
        console.log(error);
      } finally {
        runInAction('finish getting detail order', () => {
          this.loadingInitial = false;
        });
      }
    }
  };

  getOrder = (id: string) => {
    return this.orderRegistry.get(id);
  };

  //Create
  @action createOrder = async (order: IOrder) => {
    this.submitting = true;
    try {
      await agent.Orders.create(order);
      runInAction('creating order', () => {
        this.orderRegistry.set(order.id, order);
      });
      history.push(`/orders/${order.id}`);
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
  @action editOrder = async (order: IOrder) => {
    this.submitting = true;
    try {
      await agent.Orders.update(order);
      runInAction('editing orders', () => {
        this.selectedOrder = order;
        this.orderRegistry.set(order.id, order);
      });
      history.push(`/orders/${order.id}`);
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
  @action deleteOrder = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.targetDelete = event.currentTarget.name;
    //console.log(this.targetDelete);
    //console.log(this.submitting);
    try {
      await agent.Orders.delete(id);
      runInAction('deleting order', () => {
        this.orderRegistry.delete(id);
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
