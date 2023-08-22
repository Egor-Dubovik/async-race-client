import { getPages } from '../interaction/getElements';
import { storage } from '../api/storage';
import { TableWinnerData } from '../../types/winner.types';
import { Numbers } from '../../constants/numbers';
import { SORTING, ORDER } from '../../constants/base';
import { renderCarSvg } from './renderCar';

const renderWinner = (tableWinnerData: TableWinnerData): string => `
  <tr class="table__row table__regular-row">
    <td class="table__td">${tableWinnerData.index}</td>
    <td class="table__td table__td_car">${renderCarSvg(tableWinnerData.color)}</td>
    <td class="table__td">${tableWinnerData.name}</td>
    <td class="table__td">${tableWinnerData.wins}</td>
    <td class="table__td">${tableWinnerData.time}</td>
  </tr>
`;

const returnOrderClass = () =>
  storage.sortOrder === ORDER.ascending ? '_ascending' : '_descending';

export const renderWinnersTable = () => {
  const pages = getPages();
  const orderClass = returnOrderClass();

  pages[Numbers.one].innerHTML = `
    <div class="winners-page__container">
      <h2 class="winners-page__title">Winners (${storage.winnersData.amount})</h2>
      <p class="winners-page__pagination-page">Page ${storage.winnersData.page}</p>
      <table class="table winners-page__table">
        <tr class="table__row table__header-row">
          <th class="table__th">№</th>
          <th class="table__th">Car</th>
          <th class="table__th">Model</th>
          <th class="table__th table-button table-button_sort-wins ${
            storage.sortBy === SORTING.wins ? orderClass : ''
          }">Wins</th>
          <th class="table__th table-button table-button_sort-time ${
            storage.sortBy === SORTING.time ? orderClass : ''
          }">Best time (sec)</th>
        </tr>
        ${storage.winners
          .map((winner, index) => {
            return `${renderWinner({
              index: index + Numbers.one,
              color: winner.carData.color,
              name: winner.carData.name,
              wins: winner.wins,
              time: winner.time,
            })}`;
          })
          .join('')}
      </table>
    </div>  
  `;
};
