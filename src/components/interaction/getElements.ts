import { SettingElements } from '../../types/base.types';

export const getUpdateElements = (): SettingElements => {
  const inputUpdateName = document.getElementById('update-name') as HTMLInputElement;
  const inputUpdateColor = document.getElementById('update-color') as HTMLInputElement;
  const buttonUpdate = document.querySelector('.form__button_update') as HTMLButtonElement;

  return [inputUpdateName, inputUpdateColor, buttonUpdate];
};

export const getCreationElements = (): SettingElements => {
  const inputCreateName = document.getElementById('create-name') as HTMLInputElement;
  const inputCreateColor = document.getElementById('create-color') as HTMLInputElement;

  return [inputCreateName, inputCreateColor];
};

export const getStopButton = (id: string): HTMLButtonElement => {
  return document.querySelector(
    `.engine-panel__button_stop-engine[data-id="${id}"]`
  ) as HTMLButtonElement;
};

export const getStartButton = (id: string): HTMLButtonElement => {
  return document.querySelector(
    `.engine-panel__button_start-engine[data-id="${id}"]`
  ) as HTMLButtonElement;
};

export const getEnginenButtons = (id: string): NodeListOf<HTMLButtonElement> => {
  return document.querySelectorAll(`.engine-panel__button[data-id="${id}"]`);
};

export const getControlButtons = (): NodeListOf<HTMLButtonElement> => {
  return document.querySelectorAll('.button__control');
};

export const getHtmlCar = (id: string): HTMLElement => {
  return document.querySelector(`.race__car[data-id="${id}"]`) as HTMLElement;
};

export const getPageButtons = (): NodeListOf<HTMLButtonElement> => {
  return document.querySelectorAll(`.header__button`);
};

export const getPages = (): NodeListOf<HTMLButtonElement> => {
  return document.querySelectorAll(`.page`);
};

export const getPaginationButtons = (): NodeListOf<HTMLButtonElement> => {
  return document.querySelectorAll('.pagination__button');
};

export const getRaceButtons = (): NodeListOf<HTMLButtonElement> => {
  return document.querySelectorAll('.race__car-button');
};
