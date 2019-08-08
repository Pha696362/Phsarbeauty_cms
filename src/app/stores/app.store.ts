import { GeoData } from './geoData.store';
import { ECrime } from './ecrime.store';
import { Management } from './management.store';
import { Environment } from './environment.store';
import { Search } from './search.store';
import { Geo } from './geo.store';
import { Category } from './category.store';
import { Crime } from './crime.store';
import { Person } from './person.store';
import { Verdict } from './verdict.store';
import { Statistic } from './statistic.store';
import { AuthStore } from './auth.store';
import { AddCrimeStore } from './add-crime.store';

export const APP_STORES = [
  Environment,
  Search,
  Geo,
  Category,
  Management,
  Crime,
  Person,
  Verdict,
  Statistic,
  AuthStore,
  AddCrimeStore,
  ECrime,
  GeoData
];
