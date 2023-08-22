import { Api } from '../types/base.types';

export const BASE_URL = 'https://async-race-api-kvgd.onrender.com';

export const API: Api = {
  garage: `${BASE_URL}/garage`,
  winners: `${BASE_URL}/winners`,
  engine: `${BASE_URL}/engine`,
};

export const METHODS = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  patch: 'PATCH',
  delete: 'DELETE',
};

export const HEADERS = {
  totalCount: 'X-Total-Count',
  contentType: 'application/json',
};

export const STATUSES = {
  ok: 200,
  notModified: 304,
  unauthorized: 401,
  unavailable: 404,
  serverError: 500,
};

export const VIEW = {
  garage: 'garage',
  winners: 'winners',
};

export const SORTING = {
  id: 'id',
  wins: 'wins',
  time: 'time',
};

export const ORDER = {
  ascending: 'ASC',
  descending: 'DESC',
};

export const ALL_DATA = {
  carsData: 'carsData',
  winnersData: 'winnersData',
};
