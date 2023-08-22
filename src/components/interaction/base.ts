import { getPaginationButtons, getPageButtons, getPages, getControlButtons } from './getElements';
import { getWinnersData } from '../api/storage';
import { renderWinnersTable } from '../rendering/renderWinnersPage';
import { renderGarage } from '../rendering/renderGaragePage';
import { storage } from '../api/storage';
import { VIEW, ALL_DATA } from '../../constants/base';
import { Numbers } from '../../constants/numbers';
import { PageData, Data } from '../../types/base.types';
import { getCarsData } from '../api/storage';

export const switchPage = async (targetElement: HTMLElement): Promise<void> => {
  const [garageButton, winnersButton] = getPageButtons();
  const [garagePage, winnersPage] = getPages();

  if (targetElement.classList.contains('header__button_winners')) {
    await getWinnersData();
    await renderWinnersTable();
    winnersPage.classList.remove('_hidden');
    garagePage.classList.add('_hidden');
    garageButton.disabled = false;
    winnersButton.disabled = true;
    storage.page = VIEW.winners;
    return;
  }

  winnersPage.classList.add('_hidden');
  garagePage.classList.remove('_hidden');
  garageButton.disabled = true;
  winnersButton.disabled = false;
  storage.page = VIEW.garage;
};

const checkPage = (): PageData => {
  if (storage.page === VIEW.garage) {
    return { pageData: 'carsData', pageAmount: Numbers.seven };
  }
  return { pageData: 'winnersData', pageAmount: Numbers.ten };
};

export const checkPaginationAvailability = async (): Promise<void> => {
  const [buttonPrevious, buttonNext] = getPaginationButtons();
  const { pageData, pageAmount } = checkPage();

  buttonPrevious.disabled = storage[pageData].page <= Numbers.one;
  buttonNext.disabled = storage[pageData].page * pageAmount >= +storage[pageData].amount;
};

const checkDataUsed = async (data: string): Promise<void> => {
  if (data === ALL_DATA.carsData) {
    await getCarsData();
    await renderGarage();
    return;
  }

  await getWinnersData();
  await renderWinnersTable();
};

export const switchControllerButtons = (): void => {
  const [raceButton, resetButton] = getControlButtons();
  raceButton.disabled = false;
  resetButton.disabled = true;
};

export const switchGenerateButton = (isDisabled: boolean): void => {
  const generateButton = document.querySelector('.button_generate') as HTMLButtonElement;
  const createButton = document.querySelector('.form__button_create') as HTMLButtonElement;

  generateButton.disabled = isDisabled;
  createButton.disabled = isDisabled;
};

const switchPaginationPage = (targetElement: HTMLElement, data: Data): void => {
  if (targetElement.classList.contains('pagination__button_next')) {
    storage[data].page += Numbers.one;
    return;
  }

  storage[data].page -= Numbers.one;
};

export const pagination = async (targetElement: HTMLElement): Promise<void> => {
  const { pageData } = checkPage();

  switchPaginationPage(targetElement, pageData);
  await checkDataUsed(pageData);
  checkPaginationAvailability();
};
