import { observable, computed, action, runInAction } from 'mobx';
import { IUser, IUserFormValues } from '../models/user';
import agent from '../api/agent';
import { RootStore } from './rootStore';
import { history } from '../..';
import { SyntheticEvent } from 'react';
import { toast } from 'react-toastify';

export default class UserStore {
  _rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;
  }

  @observable user: IUser | null = null;

  ////Observable map
  @observable usersRegistry = new Map();

  //List
  @observable loadingInitial = false;

  //Delete
  @observable submitting = false;
  @observable targetDelete = '';

  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action login = async (values: IUserFormValues) => {
    try {
      const user = await agent.Users.login(values);
      runInAction(() => {
        this.user = user;
      });
      console.log(user);
      this._rootStore.modalStore.closeModal();
      history.push('/products');
    } catch (error) {
      toast.error('Problem login users');
      console.log(error);
      throw error;
    }
  };

  @action register = async (values: IUserFormValues) => {
    try {
      const user = await agent.Users.register(values);
      runInAction(() => {
        this.user = user;
      });
      this._rootStore.modalStore.closeModal();
      history.push('/products');
    } catch (error) {
      toast.error('Problem register users');
      console.log(error);
      throw error;
    }
  };

  //Get User
  @action loadUsers = async () => {
    this.loadingInitial = true;

    try {
      const employees = await agent.Users.getEmployee();
      runInAction('loading Users', () => {
        this.usersRegistry.clear();
        employees.forEach((user) => {
          this.usersRegistry.set(user.id, user);
        });
      });
    } catch (error) {
      toast.error('Problem load users');
      console.log(error);
    } finally {
      runInAction('finished loading', () => {
        this.loadingInitial = false;
      });
    }
  };

  //Delete
  @action deleteUser = async (event: SyntheticEvent<HTMLButtonElement>, email: string) => {
    this.submitting = true;
    this.targetDelete = event.currentTarget.name;
    try {
      await agent.Users.delete(email);
      runInAction('deleting users', () => {
        this.usersRegistry.delete(email);
      });
    } catch (error) {
      toast.error('Problem deleting users');
      console.log(error);
    } finally {
      runInAction('finished deleting', () => {
        this.submitting = false;
        this.targetDelete = '';
      });
    }
  };

  @action logout = () => {
    this.user = null;
    history.push('/');
  };
}
