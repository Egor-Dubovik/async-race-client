import { storage } from '../api/storage';
import { EngineDriveMod } from '../../types/car.types';
import { startDriveCar, stoptDriveCar } from './carControl';
import { getStartButton, getStopButton } from '../interaction/getElements';

export const startRace = async (): Promise<EngineDriveMod[]> => {
  storage.isThereWinner = false;
  const allEngines = Promise.all(
    storage.cars.map(async (car) => {
      const id = (car.id as number).toString();
      const engine = await startDriveCar(id, car.name);
      const startButton = getStartButton(id);
      const stopButton = getStopButton(id);

      startButton.disabled = true;
      stopButton.disabled = false;

      return engine;
    })
  );
  return allEngines;
};

export const stopRace = async () => {
  const allEngines = Promise.all(
    storage.cars.map(async (car) => {
      const id = (car.id as number).toString();
      const engine = await stoptDriveCar(id);
      const startButton = getStartButton(id);
      const stopButton = getStopButton(id);

      startButton.disabled = false;
      stopButton.disabled = true;

      return engine;
    })
  );
  return allEngines;
};
