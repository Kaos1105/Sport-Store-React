import { observable, action, runInAction, computed, reaction } from 'mobx';
import { SyntheticEvent } from 'react';
import { IProduct, IPhoto } from '../models/product';
import agent from '../api/agent';
import { history } from '../..';
import { toast } from 'react-toastify';
import { RootStore } from './rootStore';

const LIMIT = 5;

export default class ProductStore {
  _rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;

    reaction(
      () => this.predicate.get('final'),
      () => {
        console.log(this.predicate.get('final'));
        if (this.predicate.get('final') === 'true') {
          this.page = 1;
          this.productRegistry.clear();
          this.loadProducts();
          //this.predicate.clear();
        }
        if (this.predicate.get('final') === 'false') {
          this.page = 1;
          this.predicate.clear();
          this.productRegistry.clear();
          this.loadProducts();
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

  //Photo
  @observable loadingProfile = true;
  @observable uploadingPhoto = false;
  @observable setMainLoading = false;

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
      const productEnvelope = await agent.Product.list(this.axiosParams);
      const { products, resultCount } = productEnvelope;
      runInAction('loading products', () => {
        this.productRegistry.clear();
        this.productCount = resultCount;
        products.forEach((product) => {
          this.productRegistry.set(product.id, product);
        });
      });
    } catch (error) {
      toast.error('Problem load product');
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
        toast.error('Problem load product');
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
      toast.error('Problem editing data');
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
    //console.log(this.targetDelete);
    //console.log(this.submitting);
    try {
      await agent.Product.delete(id);
      runInAction('deleting product', () => {
        this.productRegistry.delete(id);
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

  //--Photo Part--

  @action uploadPhoto = async (file: Blob, productId: string) => {
    this.uploadingPhoto = true;
    try {
      const photo = await agent.Photo.uploadPhoto(file, productId);
      runInAction(() => {
        if (this.selectedProduct) {
          this.selectedProduct.photos.push(photo);
          if (photo.main) {
            this.selectedProduct.image = photo.url;
          }
        }
      });
    } catch (error) {
      console.log(error);
      toast.error('Problem uploading photo');
    } finally {
      runInAction(() => {
        this.uploadingPhoto = false;
      });
    }
  };

  @action setMainPhoto = async (photo: IPhoto) => {
    this.setMainLoading = true;
    try {
      await agent.Photo.setMainPhoto(photo.id);
      runInAction(() => {
        this.selectedProduct!.image = photo.url;
        this.selectedProduct!.photos.find((a) => a.main)!.main = false;
        this.selectedProduct!.photos.find((a) => (a.id = photo.id))!.main = true;
        this.selectedProduct!.image = photo.url;
      });
    } catch (error) {
      toast.error('Problem setting photo as main');
    } finally {
      runInAction(() => {
        this.setMainLoading = false;
      });
    }
    //final testing
  };

  @action deletePhoto = async (photo: IPhoto) => {
    this.setMainLoading = true;
    try {
      await agent.Photo.deletePhoto(photo.id);
      runInAction(() => {
        this.selectedProduct!.photos = this.selectedProduct!.photos.filter(
          (a) => a.id !== photo.id
        );
      });
    } catch (error) {
      toast.error('Problem deleting the photo');
    } finally {
      runInAction(() => {
        this.setMainLoading = false;
      });
    }
  };
}
//export default createContext(new ActivityStore());
