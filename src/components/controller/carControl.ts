import { driveEngine, isEngineStarted } from '../api/cars';
import { getEnginenButtons } from '../interaction/getElements';
import { EngineDriveMod } from '../../types/car.types';
import { startAnimation, stopAnimation } from '../interaction/animation';

export const startDriveCar = async (id: string, name?: string): Promise<EngineDriveMod> => {
  const [startButton, stopButton] = getEnginenButtons(id);
  startButton.disabled = true;

  const drive = await driveEngine(+id, 'started');
  const isEngineDrive = await isEngineStarted(+id);

  stopButton.disabled = false;
  startAnimation(id, name as string, drive, isEngineDrive);

  return isEngineDrive;
};

export const stoptDriveCar = async (id: string): Promise<void> => {
  const [startButton, stopButton] = getEnginenButtons(id);
  await driveEngine(+id, 'stopped');
  stopAnimation(id);
  startButton.disabled = false;
  stopButton.disabled = true;
};
