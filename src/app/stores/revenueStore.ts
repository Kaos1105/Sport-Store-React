import { observable, action, runInAction, computed, reaction } from 'mobx';
import agent from '../api/agent';
import { toast } from 'react-toastify';
import { RootStore } from './rootStore';

const LIMIT = 5;

export default class RevenueStore {
  _rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;
  }

  //Observable map
  @observable revenueRegistry = new Map();

  //List
  @observable loadingInitial = false;

  //Paging
  @observable revenueCount = 0;
  @observable page = 1;

  @computed get totalPages() {
    return Math.ceil(this.revenueCount / LIMIT);
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
    this.revenueRegistry.clear();
    this.loadRevenues();
  };

  //List
  @action loadRevenues = async () => {
    this.loadingInitial = true;

    try {
      const revenueEnvelope = await agent.Revenue.list(this.axiosParams);
      const { revenues, resultCount } = revenueEnvelope;
      runInAction('loading revenues statistic', () => {
        this.revenueRegistry.clear();
        this.revenueCount = resultCount;
        revenues.forEach((revenue) => {
          this.revenueRegistry.set(`${revenue.month}-${revenue.year}`, revenue);
        });
      });
    } catch (error) {
      toast.error('Problem load revenues statistics');
      console.log(error);
    } finally {
      runInAction('finished loading', () => {
        this.loadingInitial = false;
      });
    }
  };

  getRevenue = (id: string) => {
    return this.revenueRegistry.get(id);
  };
}
//export default createContext(new ActivityStore());
