import '../src/styles/style.scss';
import { addSelection } from './components/interaction/toggleUpdateFormSelect';
import { renderContent } from './components/rendering/renderContent';
import { updateCar, deleteCarById, createCar } from './components/api/cars';
import { renderGarage } from './components/rendering/renderGaragePage';
import { getStartData, getWinnersData } from './components/api/storage';
import { deleteWinnerById } from './components/api/winners';
import { startDriveCar, stoptDriveCar } from './components/controller/carControl';
import { generateRandomCars } from './components/interaction/generateRandomCars';
import { startRace, stopRace } from './components/controller/raceСontrol';
import { renderWinnersTable } from './components/rendering/renderWinnersPage';
import { sortAndOrder } from './components/interaction/sortAndOrder';
import { storage } from './components/api/storage';
import {
  WRAPER,
  HEADER,
  MAIN,
  GARAGE_PAGE,
  WINNERS_PAGE,
  PAGINATION,
  FOOTER,
} from './constants/markup';
import {
  getUpdateElements,
  getCreationElements,
  getControlButtons,
  getPaginationButtons,
  getRaceButtons,
} from './components/interaction/getElements';
import {
  checkPaginationAvailability,
  switchPage,
  pagination,
  switchControllerButtons,
  switchGenerateButton,
} from './components/interaction/base';

const firstDisplay = async (): Promise<void> => {
  renderContent(document.body, [WRAPER]);
  renderContent(document.querySelector('.wrapper') as HTMLElement, [HEADER, MAIN, FOOTER]);
  renderContent(document.querySelector('.main') as HTMLElement, [
    GARAGE_PAGE,
    WINNERS_PAGE,
    PAGINATION,
  ]);
  await getStartData();
  renderGarage();
  checkPaginationAvailability();
};

firstDisplay();

const drivingCarEventHandling = async (targetElement: HTMLElement): Promise<void> => {
  if (targetElement.classList.contains('engine-panel__button_start-engine')) {
    const id = targetElement.dataset.id as string;
    startDriveCar(id);
  }

  if (targetElement.classList.contains('engine-panel__button_stop-engine')) {
    const id = targetElement.dataset.id as string;
    stoptDriveCar(id);
  }
};

const raceEventHandling = async (targetElement: HTMLElement): Promise<void> => {
  if (targetElement.classList.contains('button_race')) {
    const paginationButtons = getPaginationButtons();
    const raceButtons = getRaceButtons();
    const [raceButton, resetButton] = getControlButtons();

    switchGenerateButton(true);
    storage.isThereWinner = false;
    raceButton.disabled = true;
    paginationButtons.forEach((button): void => {
      button.disabled = true;
    });

    raceButtons.forEach((button): void => {
      button.disabled = true;
    });

    const allEngines = await startRace();
    if (allEngines) resetButton.disabled = false;
  }
};

const resetEventHandling = async (targetElement: HTMLElement): Promise<void> => {
  if (targetElement.classList.contains('button_reset')) {
    const raceButtons = getRaceButtons();
    checkPaginationAvailability();
    switchGenerateButton(false);

    storage.isThereWinner = true;
    const allEngines = await stopRace();

    if (allEngines) {
      const [raceButton, resetButton] = getControlButtons();
      raceButton.disabled = false;
      resetButton.disabled = true;
    }

    raceButtons.forEach((button): void => {
      button.disabled = false;
    });
  }
};

const updateCarEventHandling = async (event: Event, targetElement: HTMLElement): Promise<void> => {
  if (targetElement.classList.contains('form__button_update')) {
    event.preventDefault();
    const [inputUpdateName, inputUpdateColor] = getUpdateElements();
    const id = +(targetElement.dataset.id as string);

    await updateCar(id, {
      name: inputUpdateName.value,
      color: inputUpdateColor.value,
      id: id,
    });
    await getStartData();
    renderGarage();
  }

  if (targetElement.classList.contains('car-button_select')) {
    const settingElements = await getUpdateElements();
    addSelection(targetElement, settingElements);
  }
};

const removeCarEventHandling = async (targetElement: HTMLElement): Promise<void> => {
  if (targetElement.classList.contains('car-button_remove')) {
    const id = +(targetElement.dataset.id as string);
    await deleteCarById(id);
    await deleteWinnerById(id);
    await getStartData();
    renderGarage();
  }
};

const createCarEventHandling = async (event: Event, targetElement: HTMLElement): Promise<void> => {
  if (targetElement.classList.contains('form__button_create')) {
    event.preventDefault();
    const [inputCreateName, inputCreateColor] = getCreationElements();
    const resetButton = document.querySelector('.button_reset') as HTMLElement;

    await createCar({
      name: inputCreateName.value,
      color: inputCreateColor.value,
    });
    await getStartData();
    renderGarage();
    resetEventHandling(resetButton);
  }
};

const generateCarEventHandling = async (targetElement: HTMLElement): Promise<void> => {
  if (targetElement.classList.contains('button_generate')) {
    switchControllerButtons();
    await generateRandomCars();
    await getStartData();
    renderGarage();
    checkPaginationAvailability();
  }
};

const switchPageEventHandling = async (targetElement: HTMLElement): Promise<void> => {
  if (targetElement.classList.contains('header__button')) {
    await switchPage(targetElement);
    checkPaginationAvailability();
  }
};

const sortingEventHandling = async (targetElement: HTMLElement): Promise<void> => {
  if (targetElement.classList.contains('table-button')) {
    sortAndOrder(targetElement);
    await getWinnersData();
    renderWinnersTable();
  }
};

const paginationEventHandling = async (targetElement: HTMLElement): Promise<void> => {
  if (targetElement.classList.contains('pagination__button')) {
    await pagination(targetElement);
    switchControllerButtons();
    switchGenerateButton(false);
  }
};

document.addEventListener('click', (event: Event) => {
  const targetElement = event.target as HTMLElement;
  drivingCarEventHandling(targetElement);
  updateCarEventHandling(event, targetElement);
  removeCarEventHandling(targetElement);
  createCarEventHandling(event, targetElement);
  generateCarEventHandling(targetElement);
  raceEventHandling(targetElement);
  resetEventHandling(targetElement);
  switchPageEventHandling(targetElement);
  sortingEventHandling(targetElement);
  paginationEventHandling(targetElement);
});
