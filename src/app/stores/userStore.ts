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

  //Observable map
  @observable usersRegistry = new Map();

  //Observable edit role map
  @observable rolesRegistry = new Map();

  //List
  @observable loadingInitial = false;

  //Delete
  @observable submitting = false;
  @observable targetDelete = '';

  //Update
  @observable targetUpdate = '';

  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action login = async (values: IUserFormValues) => {
    try {
      const user = await agent.Users.login(values);
      runInAction(() => {
        this.user = user;
      });
      this._rootStore.commonStore.setToken(user.token);
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
      //const user =
      await agent.Users.register(values);
      // runInAction(() => {
      //   this.user = user;
      // });
      //this._rootStore.commonStore.setToken(user.token);
      this._rootStore.modalStore.closeModal();
      history.push('/products');
    } catch (error) {
      toast.error('Problem register users');
      console.log(error);
      throw error;
    }
  };

  //Get User
  @action getUser = async () => {
    try {
      const user = await agent.Users.current();
      runInAction(() => (this.user = user));
    } catch (error) {
      console.log(error);
    }
  };

  //Get Users
  @action loadUsers = async () => {
    this.loadingInitial = true;

    try {
      const employees = await agent.Users.getEmployee();
      runInAction('loading Users', () => {
        this.usersRegistry.clear();
        employees.forEach((user) => {
          this.usersRegistry.set(user.email, user);
          this.rolesRegistry.set(user.email, user.role);
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

  //Edit
  @action updateUser = async (user: IUserFormValues) => {
    try {
      user.email = this.user?.email!;
      const editedUser = await agent.Users.edit(user);

      runInAction(() => {
        this.usersRegistry.set(user.email, editedUser);
        this.user = editedUser;
      });
      this._rootStore.modalStore.closeModal();
    } catch (error) {
      toast.error('Problem updating User');
    }
  };

  //Set Role
  @action setRole = async (event: SyntheticEvent<HTMLButtonElement>, role: String) => {
    this.submitting = true;
    this.targetUpdate = event.currentTarget.name;
    let email = this.targetUpdate;
    try {
      const user = await agent.Users.setRole(email, role);
      runInAction(() => {
        this.usersRegistry.set(user.email, user);
      });
    } catch (error) {
      toast.error('Problem edit role User');
    } finally {
      runInAction('finished deleting', () => {
        this.submitting = false;
        this.targetUpdate = '';
      });
    }
  };

  //Set Registry
  @action setRegistryRole = async (email: String, role: String) => {
    try {
      runInAction(() => {
        this.rolesRegistry.set(email, role);
      });
    } catch (error) {
      toast.error('Problem set role User');
    } finally {
      runInAction('finished set', () => {});
    }
  };

  @action logout = () => {
    this._rootStore.commonStore.setToken(null);
    this.user = null;
    history.push('/');
  };
}
