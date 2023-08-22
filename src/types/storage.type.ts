import { RaceWinnerData } from './winner.types';
import { CarData } from './car.types';

export type PaginationData = {
  page: number;
  amount: string;
};

export type Storage = {
  carsData: PaginationData;
  winnersData: PaginationData;
  cars: CarData[];
  winners: RaceWinnerData[];
  isThereWinner: boolean;
  page: string;
  sortBy: string;
  sortOrder: string;
};
