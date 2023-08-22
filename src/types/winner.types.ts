import { CarData } from './car.types';

export type WinnerData = {
  id: number;
  time: number;
  wins: number;
};

export type WinnerSaveData = {
  id: number;
  time: number;
};

export type WinnerParams = {
  page: number;
  limit?: number;
  sort?: string;
  ORDER?: string;
};

export type TableWinnerData = {
  index: number;
  color: string;
  name: string;
  wins: number;
  time: number;
};

export type RaceWinnerData = {
  id: number;
  time: number;
  wins: number;
  carData: CarData;
};

export type WinnersData = {
  winners: RaceWinnerData[];
  amount: string;
};
