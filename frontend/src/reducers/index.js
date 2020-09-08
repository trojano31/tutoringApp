import { createStore } from 'redux';
import { advertReducer } from './advert.reducer';

export const store = createStore(advertReducer);
