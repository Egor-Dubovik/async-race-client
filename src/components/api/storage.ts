import { getCarsByParams } from './cars';
import { getAllWinners } from './winners';
import { Numbers } from '../../constants/numbers';
import { NULL } from '../../constants/string';
import { VIEW } from '../../constants/base';
import { Storage } from '../../types/storage.type';
import { SORTING, ORDER } from '../../constants/base';

export const storage: Storage = {
  carsData: { page: Numbers.one, amount: NULL },
  winnersData: { page: Numbers.one, amount: NULL },
  cars: [],
  winners: [],
  isThereWinner: true,
  page: VIEW.garage,
  sortBy: SORTING.wins,
  sortOrder: ORDER.descending,
};

export const getCarsData = async (): Promise<void> => {
  const { carsData, carsAmount } = await getCarsByParams({
    _page: storage.carsData.page,
    _limit: Numbers.seven,
  });
  storage.cars = carsData;
  storage.carsData.amount = carsAmount;
};

export const getWinnersData = async (): Promise<void> => {
  const { winners, amount: winnersAmount } = await getAllWinners({
    page: storage.winnersData.page,
    limit: Numbers.ten,
    sort: storage.sortBy,
    ORDER: storage.sortOrder,
  });
  storage.winners = winners;
  storage.winnersData.amount = winnersAmount;
};

export const getStartData = async (): Promise<void> => {
  await getCarsData();
  await getWinnersData();
};
