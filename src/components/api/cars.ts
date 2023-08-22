import { CarQueryParams } from '../../types/car.types';
import { CarData, CarsData, Engine } from '../../types/car.types';
import { API, STATUSES, METHODS, HEADERS } from '../../constants/base';
import { EngineDriveMod } from '../../types/car.types';

export const getCarsByParams = async (queryParams: CarQueryParams): Promise<CarsData> => {
  const url = `${API.garage}?_page=${queryParams._page}&_limit=${queryParams._limit}`;
  const carsResponse: Response = await fetch(url);
  return {
    carsData: await carsResponse.json(),
    carsAmount: carsResponse.headers.get(HEADERS.totalCount) as string,
  };
};

export const getCarById = async (id: number): Promise<CarData> => {
  const url = `${API.garage}/${id}`;
  return (await fetch(url)).json();
};

export const createCar = async (carData: CarData): Promise<CarData> => {
  const carsResponse = await fetch(API.garage, {
    method: METHODS.post,
    headers: {
      'Content-Type': HEADERS.contentType,
    },
    body: JSON.stringify(carData),
  });

  const carResponseData = await carsResponse.json();
  return carResponseData;
};

export const updateCar = async (id: number, carData: CarData): Promise<CarData> => {
  const carsResponse = await fetch(`${API.garage}/${id}`, {
    method: METHODS.put,
    headers: {
      'Content-Type': HEADERS.contentType,
    },
    body: JSON.stringify(carData),
  });

  const carResponseData = await carsResponse.json();
  return carResponseData;
};

export const deleteCarById = async (id: number): Promise<CarData> => {
  const carsResponse = await fetch(`${API.garage}/${id}`, { method: METHODS.delete });
  const carResponseData = carsResponse.json();
  return carResponseData;
};

export const driveEngine = async (id: number, status: string): Promise<Engine> => {
  const engineResponse = await fetch(`${API.engine}?id=${id}&status=${status}`, {
    method: METHODS.patch,
  });

  const engineResponseData = await engineResponse.json();
  return engineResponseData;
};

export const isEngineStarted = async (id: number): Promise<EngineDriveMod> => {
  const engineUrl = `${API.engine}?id=${id}&status=drive`;
  const engineResponse = await fetch(engineUrl, { method: METHODS.patch });

  return engineResponse.status === STATUSES.ok ? engineResponse.json() : { success: false };
};
