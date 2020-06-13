import { observable, action, computed, runInAction } from 'mobx';
import { SyntheticEvent } from 'react';
import { IProduct } from '../models/product';
import agent from '../api/agent';
import { history } from '../..';
import { toast } from 'react-toastify';
import { RootStore } from './rootStore';

export default class ActivityStore {
  _rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;
  }

  //Observable map
  @observable productRegistry = new Map();
  //List
  @observable loadingInitial = false;

  //Details
  @observable selectedProduct: IProduct | null = null;

  //Create
  @observable submitting = false;

  //Delete
  @observable targetDelete = '';

  //List
  @action loadActivities = async () => {
    this.loadingInitial = true;

    try {
      const products = await (await agent.Product.list()).products;

      runInAction('loading products', () => {
        products.forEach((product) => {
          this.productRegistry.set(product.id, product);
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction('finished loading', () => {
        this.loadingInitial = false;
      });
    }
  };

  //Detail
  @action loadActivity = async (id: string) => {
    let product = this.getProduct(id);
    if (product) {
      this.selectedProduct = product;
      return product;
    } else {
      this.loadingInitial = true;
      try {
        product = await agent.Product.details(id);
        runInAction('getting detail product', () => {
          this.selectedProduct = product;
          this.productRegistry.set(product.id, product);
        });
        return product;
      } catch (error) {
        console.log(error);
      } finally {
        runInAction('finish getting detail product', () => {
          this.loadingInitial = false;
        });
      }
    }
  };

  getProduct = (id: string) => {
    return this.productRegistry.get(id);
  };

  //Create
  @action createProduct = async (product: IProduct) => {
    this.submitting = true;
    try {
      await agent.Product.create(product);
      runInAction('creating product', () => {
        this.productRegistry.set(product.id, product);
      });
      history.push(`/products/${product.id}`);
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
  @action editProduct = async (product: IProduct) => {
    this.submitting = true;
    try {
      await agent.Product.update(product);
      runInAction('editing product', () => {
        this.selectedProduct = product;
        this.productRegistry.set(product.id, product);
      });
      history.push(`/products/${product.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      runInAction('finished editing', () => {
        this.submitting = false;
      });
    }
  };

  //Delete
  @action deleteProduct = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.targetDelete = event.currentTarget.name;
    console.log(this.targetDelete);
    console.log(this.submitting);
    try {
      await agent.Product.delete(id);
      runInAction('deleting product', () => {
        this.productRegistry.delete(id);
      });
    } catch (error) {
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
