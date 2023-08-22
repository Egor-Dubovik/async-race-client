import { renderCar } from './renderCar';
import { Numbers, CARS_AMOUNT_ON_PAGE } from '../../constants/numbers';
import { getCarsByParams } from '../api/cars';
import { storage } from '../api/storage';

export const renderGarage = (): void => {
  (document.querySelector('.garage') as HTMLElement).innerHTML = `
    <h2 class="garage__title">Garage (${storage.carsData.amount} cars)</h2>
    <p class="garage__pagination-page">Page ${storage.carsData.page}</p>
    <ul class="garage__races">
     ${storage.cars
       .map((car) => {
         return `${renderCar({
           id: car.id,
           name: car.name,
           color: car.color,
         })}`;
       })
       .join('')}
    </ul>
    <p class="garage__win-message _hidden font-effect-fire-animation">YOU ARE WIN!</p>
  `;
};

export const updateGarage = async (): Promise<void> => {
  const { carsData, carsAmount } = await getCarsByParams({
    _page: +storage.carsData.page,
    _limit: CARS_AMOUNT_ON_PAGE,
  });
  storage.cars = carsData;
  storage.carsData.amount = carsAmount;

  const nextButton = document.getElementById('next') as HTMLButtonElement;
  nextButton.disabled = storage.carsData.page * CARS_AMOUNT_ON_PAGE >= +storage.carsData.amount;

  const previousButton = document.getElementById('prev') as HTMLButtonElement;
  previousButton.disabled = storage.carsData.page <= Numbers.one;
};
