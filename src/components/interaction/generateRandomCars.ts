import { colors } from '../../constants/carOptions';
import { Numbers, INITIAL_STEP, GENERATE_CARS_NUMBER } from '../../constants/numbers';
import { carNames } from '../../constants/carOptions';
import { createCar } from '../api/cars';

const getRandomNumber = (minimum: number, maximum: number): number => {
  return Math.round(Math.random() * (maximum - minimum) + minimum);
};

export const generateRandomCars = async (): Promise<void> => {
  for (let i = INITIAL_STEP; i < GENERATE_CARS_NUMBER; i++) {
    const randomColorNumber = getRandomNumber(Numbers.zero, colors.length - Numbers.one);
    const randomBrandNumber = getRandomNumber(Numbers.zero, carNames.length - Numbers.one);
    const randomModelNumber = getRandomNumber(Numbers.zero, carNames.length - Numbers.one);

    const brand = carNames[randomBrandNumber].brand;
    const model = carNames[randomBrandNumber].model[randomModelNumber];

    await createCar({
      name: `${brand} ${model}`,
      color: colors[randomColorNumber],
    });
  }
};
