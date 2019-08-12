import { Bookstore } from './bookstore';
import { Environment } from './environment.store';
import { Search } from './search.store';
import { AuthStore } from './auth.store';
import { BaseStore } from './base.store';

export const APP_STORES = [
  Environment,
  Search,
  AuthStore,
  Bookstore,
  BaseStore,
];
