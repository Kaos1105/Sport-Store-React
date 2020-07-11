import { observable, action, runInAction, computed } from 'mobx';
import { SyntheticEvent } from 'react';
import agent from '../api/agent';
import { history } from '../..';
import { toast } from 'react-toastify';
import { RootStore } from './rootStore';
import { IImport, IProductImport } from '../models/import';
import { IProduct } from '../models/product';

const LIMIT = 5;

export default class ImportStore {
  _rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;
  }

  //Observable map
  @observable importRegistry = new Map();

  //List
  @observable loadingInitial = false;

  //Details
  @observable selectedImport: IImport | null = null;

  //Dropdown options
  @observable selectedProduct: IProduct | null = null;
  @observable quantity: number = 0;

  //Set product
  @action setSelectedProduct = async (product: IProduct) => {
    try {
      runInAction('setting product', () => {
        this.selectedProduct = product;
      });
    } catch (error) {
      console.log(error);
      toast.error('Problem setting product options');
    } finally {
      runInAction('finished loading', () => {});
    }
  };
  //Set quantity
  @action setQuantity = async (input: number) => {
    try {
      runInAction('setting quantity', () => {
        this.quantity = input;
      });
    } catch (error) {
      console.log(error);
      toast.error('Quantity is not valid');
    } finally {
      runInAction('finished loading', () => {});
    }
  };

  //Create
  @observable submitting = false;

  //Edit productImport
  @observable editable = false;

  //Delete
  @observable targetDelete = '';

  //Paging
  @observable importCount = 0;
  @observable page = 1;

  @computed get totalPages() {
    return Math.ceil(this.importCount / LIMIT);
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
  @action loadFilters = (isReset: boolean) => {
    this.page = 1;
    if (isReset) {
      this.predicate.clear();
    }
    this.importRegistry.clear();
    this.loadImports();
  };

  //List
  @action loadImports = async () => {
    this.loadingInitial = true;

    try {
      const importEnvelope = await agent.Imports.list(this.axiosParams);
      const { imports, resultCount } = importEnvelope;
      runInAction('loading imports', () => {
        this.importRegistry.clear();
        this.importCount = resultCount;
        imports.forEach((importDTO) => {
          this.importRegistry.set(importDTO.id, importDTO);
        });
      });
    } catch (error) {
      toast.error('Problem loading imports');
      console.log(error);
    } finally {
      runInAction('finished loading', () => {
        this.loadingInitial = false;
      });
    }
  };

  //Detail
  @action loadImport = async (id: string) => {
    let importDTO = this.getImport(id);
    if (importDTO) {
      this.selectedImport = importDTO;
      return importDTO;
    } else {
      this.loadingInitial = true;
      try {
        importDTO = await agent.Imports.details(id);
        runInAction('getting detail import', () => {
          this.selectedImport = importDTO;
          this.importRegistry.set(importDTO.id, importDTO);
        });
        return importDTO;
      } catch (error) {
        toast.error('Problem load import');
        console.log(error);
      } finally {
        runInAction('finish getting detail import', () => {
          if (importDTO.products.length == 0) this.editable = true;
          else this.editable = false;
          this.loadingInitial = false;
        });
      }
    }
  };

  getImport = (id: string) => {
    return this.importRegistry.get(id);
  };

  //Create
  @action createImport = async (importDTO: IImport) => {
    this.submitting = true;
    try {
      await agent.Imports.create(importDTO);
      runInAction('creating import', () => {
        this.importRegistry.set(importDTO.id, importDTO);
      });
      history.push(`/imports/${importDTO.id}`);
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
  @action editImport = async (importDTO: IImport) => {
    this.submitting = true;
    try {
      await agent.Imports.update(importDTO);
      runInAction('editing import', () => {
        this.selectedImport = importDTO;
        this.importRegistry.set(importDTO.id, importDTO);
      });
      history.push(`/imports/${importDTO.id}`);
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
  @action deleteImport = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.targetDelete = event.currentTarget.name;
    //console.log(this.targetDelete);
    //console.log(this.submitting);
    try {
      await agent.Imports.delete(id);
      runInAction('deleting import', () => {
        this.importRegistry.delete(id);
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

  //Add ImportProduct
  @action addProductImport = async () => {
    if (this.quantity <= 0) toast.error('Quantity is not valid');
    else if (this.selectedProduct === null) toast.error('Must select a product before adding');
    else {
      try {
        runInAction('adding product import', () => {
          let productImport: IProductImport = {
            product: this.selectedProduct!,
            quantity: this.quantity,
          };
          let isProductContained: boolean = false;
          if (this.selectedImport!.products.length == 0)
            this.selectedImport?.products.push(productImport);
          else {
            for (let iterator of this.selectedImport!.products) {
              if (iterator.product.id === productImport.product.id) {
                iterator.quantity += productImport.quantity;
                isProductContained = true;
              }
            }
            if (!isProductContained) this.selectedImport?.products.push(productImport);
          }
        });
      } catch (error) {
        toast.error('Problem adding data');
        console.log(error);
      } finally {
        runInAction('finished adding', () => {});
      }
    }
  };

  //Remove ImportProduct
  @action removeProductImport = async () => {
    try {
      runInAction('Remove product import', () => {
        this.selectedImport!.products = this.selectedImport!.products.filter(
          (p) => p.product.id !== this.selectedProduct?.id
        );
      });
    } catch (error) {
      toast.error('Problem remove data');
      console.log(error);
    } finally {
      runInAction('finished removing', () => {});
    }
  };
}
//export default createContext(new ActivityStore());
