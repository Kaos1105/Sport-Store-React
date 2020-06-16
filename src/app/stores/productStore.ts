import { observable, action, runInAction, computed, reaction } from 'mobx';
import { SyntheticEvent } from 'react';
import { IProduct } from '../models/product';
import agent from '../api/agent';
import { history } from '../..';
import { toast } from 'react-toastify';
import { RootStore } from './rootStore';
import { category } from '../common/sample/categoryOptions';

const LIMIT = 5;
//export var categoryOptions: category[];
//var categoryOptions: String[];
//var brandOptions: String[];

export default class ProductStore {
  _rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;

    reaction(
      () => this.predicate.keys(),
      () => {
        if (this.predicate.get('final') === 'true') {
          this.page = 1;
          this.productRegistry.clear();
          this.loadProducts();
          this.predicate.clear();
        } else if (this.predicate.get('final') === 'false') {
          this.page = 1;
          this.productRegistry.clear();
          this.loadProducts();
          this.predicate.clear();
        }
      }
    );
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

  //Paging
  @observable productCount = 0;
  @observable page = 1;

  @computed get totalPages() {
    return Math.ceil(this.productCount / LIMIT);
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
  @action loadProducts = async () => {
    this.loadingInitial = true;

    try {
      const productEnvelope = await await agent.Product.list(this.axiosParams);
      const { products, resultCount } = productEnvelope;
      runInAction('loading products', () => {
        this.productRegistry.clear();
        this.productCount = resultCount;
        products.map((product) => {
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
  @action loadProduct = async (id: string) => {
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
