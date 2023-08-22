import { Numbers, CAR_WIDTH, EQUALIZATION_FACTOR } from '../../constants/numbers';
import { EngineDriveMod } from '../../types/car.types';
import { Engine } from '../../types/car.types';
import { NULL } from '../../constants/string';
import { getHtmlCar } from './getElements';
import { checkWinner } from './checkWinners';

const animationFrames: Map<string, number> = new Map();
let animationId: number;

export const startAnimation = (
  id: string,
  name: string,
  drive: Engine,
  isEngineDrive: EngineDriveMod
) => {
  const race = document.querySelector('.garage__races') as HTMLElement;
  const car = getHtmlCar(id);
  let isEngineBroken = false;
  let startAnimationTime = Numbers.zero;

  let distance = race.clientWidth - CAR_WIDTH;
  const duration = (distance * EQUALIZATION_FACTOR) / drive.velocity;

  if (!isEngineDrive.success) {
    const engineBreakdownRatio = Math.ceil(Math.random() * Numbers.ten) + Numbers.one;
    distance = distance / engineBreakdownRatio;
    isEngineBroken = true;
  }

  animationId = requestAnimationFrame(function animate(time) {
    if (!startAnimationTime) {
      startAnimationTime = time;
    }
    const progress = (time - startAnimationTime) / duration;
    const position = progress * distance;

    car.style.left = `${position}px`;

    if (distance > position) animationId = requestAnimationFrame(animate);
    animationFrames.set(id, animationId);

    if (!isEngineBroken) checkWinner(id, name, drive.distance, drive.velocity);
  });
};

export const stopAnimation = (id: string): void => {
  const car = getHtmlCar(id);
  const currentAnimationId = animationFrames.get(id) as number;

  cancelAnimationFrame(currentAnimationId);
  car.style.left = NULL;
};
