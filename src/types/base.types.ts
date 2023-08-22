export type Api = {
  garage: string;
  winners: string;
  engine: string;
};

export type SettingElements = (HTMLInputElement | HTMLButtonElement)[];

export type Data = 'carsData' | 'winnersData';

export type PageData = {
  pageData: Data;
  pageAmount: number;
};
