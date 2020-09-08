import React from 'react';
import { render } from '@testing-library/react';
import { AdvertListPresenter } from './avert-list.presenter';

test('renders adverts list', () => {
  const { getAllByText } = render(<AdvertListPresenter {...{ adverts, filter: {}, setFilter: () => {} }}/>);
  const priceFromLabel = getAllByText(/Cena od/i);
  const priceToLabel = getAllByText(/Cena do/i);
  const title = getAllByText(/Znalezione Ogłoszenia/i);
  const nameText = getAllByText(/Jan/i);
  const placeText = getAllByText(/On-line/i);
  const subjectText = getAllByText(/Matematyka/i);
  const PriceText = getAllByText(/50 zł za 60 min/i);
  expect(priceFromLabel).toHaveLength(2);
  expect(priceToLabel).toHaveLength(2);
  expect(title).toHaveLength(1);
  expect(nameText).toHaveLength(2);
  expect(placeText).toHaveLength(2);
  expect(subjectText).toHaveLength(2);
  expect(PriceText).toHaveLength(2);
});
