import { storage } from '../api/storage';
import { ORDER, SORTING } from '../../constants/base';

const getOrder = (): void => {
  if (storage.sortOrder === ORDER.descending) {
    storage.sortOrder = ORDER.ascending;
    return;
  }
  storage.sortOrder = ORDER.descending;
};

const getSort = (targetElement: HTMLElement): void => {
  if (targetElement.classList.contains('table-button_sort-wins')) {
    storage.sortBy = SORTING.wins;
    return;
  }
  storage.sortBy = SORTING.time;
};

export const sortAndOrder = (targetElement: HTMLElement): void => {
  getSort(targetElement);
  getOrder();
};
