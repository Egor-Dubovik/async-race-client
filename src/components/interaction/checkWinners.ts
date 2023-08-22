import { storage } from '../api/storage';
import { saveWinner } from '../api/winners';
import { Numbers, WINNER_MESSAGE_TIME, TIME_FACTOR } from '../../constants/numbers';

const showWinnerMessage = (name: string, time: string): void => {
  const winMessage = document.querySelector('.garage__win-message') as HTMLParagraphElement;
  winMessage.textContent = `${name} went first [${time}s]`;
  winMessage.classList.remove('_hidden');
  setTimeout(() => {
    winMessage.classList.add('_hidden');
  }, WINNER_MESSAGE_TIME);
};

export const checkWinner = async (
  id: string,
  name: string,
  distance: number,
  velocity: number
): Promise<void> => {
  if (!storage.isThereWinner) {
    storage.isThereWinner = true;
    const theBestTime = (distance / (velocity * TIME_FACTOR)).toFixed(Numbers.two);
    await saveWinner({ id: +id, time: +theBestTime });
    showWinnerMessage(name, theBestTime);
  }
};
