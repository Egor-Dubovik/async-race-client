import { API, STATUSES, METHODS, HEADERS } from '../../constants/base';
import { Numbers } from '../../constants/numbers';
import { getCarById } from './cars';
import { WinnerData, WinnerSaveData, WinnersData, WinnerParams } from '../../types/winner.types';

const getSortOrder = (sort?: string, ORDER?: string): string =>
  sort && ORDER ? `&_sort=${sort}&_order=${ORDER}` : '';

export const getAllWinners = async ({
  page,
  limit,
  sort,
  ORDER,
}: WinnerParams): Promise<WinnersData> => {
  const winnersUrl = `${API.winners}?_page=${page}&_limit=${limit}${getSortOrder(sort, ORDER)}`;
  const winnersResponse = await fetch(winnersUrl);
  const winners = await winnersResponse.json();

  const winnerData = {
    winners: await Promise.all(
      winners.map(async (winner: WinnerData) => ({
        ...winner,
        carData: await getCarById(winner.id),
      }))
    ),
    amount: winnersResponse.headers.get(HEADERS.totalCount) as string,
  };

  return winnerData;
};

export const getWinnerById = async (id: number): Promise<WinnerData> => {
  const winnersUrl = `${API.winners}/${id}`;
  return (await fetch(winnersUrl)).json();
};

export const createWinner = async (winnerData: WinnerData): Promise<WinnerData> => {
  const winnersResponse = await fetch(API.winners, {
    method: METHODS.post,
    headers: {
      'Content-Type': HEADERS.contentType,
    },
    body: JSON.stringify(winnerData),
  });

  const winnersResponseData = await winnersResponse.json();
  return winnersResponseData;
};

export const updateWinner = async (id: number, winnerData: WinnerData): Promise<WinnerData> => {
  const winnersUrl = `${API.winners}/${id}`;
  const winnersResponse = await fetch(winnersUrl, {
    method: METHODS.put,
    headers: {
      'Content-Type': HEADERS.contentType,
    },
    body: JSON.stringify(winnerData),
  });

  const winnersResponseData = await winnersResponse.json();
  return winnersResponseData;
};

export const deleteWinnerById = async (id: number): Promise<WinnerData> => {
  const winnersUrl = `${API.winners}/${id}`;
  const winnersResponse = await fetch(winnersUrl, { method: METHODS.delete });
  const winnersResponseData = winnersResponse.json();
  return winnersResponseData;
};

export const getWinnerStatus = async (id: number): Promise<number | void> => {
  const winnersUrl = `${API.winners}/${id}`;
  const winnersResponse = await fetch(winnersUrl);
  return winnersResponse.status;
};

export const saveWinner = async ({ id, time }: WinnerSaveData): Promise<void> => {
  const winnerStatus = await getWinnerStatus(id);

  if (winnerStatus === STATUSES.unavailable) {
    await createWinner({ id, wins: Numbers.one, time });
    return;
  }

  const winner = await getWinnerById(id);
  await updateWinner(id, {
    id,
    wins: winner.wins + Numbers.one,
    time: time < winner.time ? time : winner.time,
  });
};
