import React from 'react';
import { AdvertListPresenter } from './avert-list.presenter';
import { adverts } from './adverts';

export const AdvertList = () =>
<AdvertListPresenter {...{ adverts }} />
