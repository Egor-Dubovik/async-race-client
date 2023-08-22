export type CarData = {
  name: string;
  color: string;
  id?: number;
};

export type CarsData = {
  carsData: CarData[];
  carsAmount: string;
};

export type CarsName = {
  brand: string;
  model: string[];
};

export type Engine = {
  velocity: number;
  distance: number;
};

export type EngineDriveMod = {
  success: boolean;
};

export type CarQueryParams = {
  _page: number;
  _limit: number;
};
