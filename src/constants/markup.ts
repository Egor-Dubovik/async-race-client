export const WRAPER = '<div class="wrapper"></div>';

export const HEADER = `
  <header class="header">
  <div class="header__container">
    <div class="header__content">
      <img class="header__icon" src="./assets/images/car.png" alt="car">
      <h1 class="header__title" >Async Race Game</h1>
    </div>
    <div class="header__buttons">
      <button type="button" class="button header__button header__button_garage" disabled>garage</button>
      <button type="button" class="button header__button header__button_winners">winners</button>
    </div>
  </div>
  </header>
`;

export const MAIN = '<main class="main"></main>';

export const GARAGE_PAGE = `
  <section class="page garage-page">
  <div class="garage-page__container">
    <div class="controllers">
      <div class="forms controllers_forms">
        <form class="form creation-form" id="creation-form">
          <input class="form__input-name" id="create-name" name="name" type="text" required placeholder="name" autocomplete="off"/>
          <input
            class="form__input-color"
            id="create-color"
            name="color"
            type="color"
            value="#ffffff"
          />
          <button class="button form__button form__button_create" type="submit">Create</button>
        </form>
        <form class="form updation-form" id="updation-form">
          <input
            class="form__input-name"
            id="update-name"
            name="name"
            type="text"
            disabled
            required
            placeholder="name"
            autocomplete="off"
          />
          <input
            class="form__input-color"
            id="update-color"
            name="color"
            type="color"
            value="#ffffff"
            disabled
          />
          <button class="button form__button form__button_update" type="submit" disabled >Update</button>
        </form>
      </div>
      <ul class="controllers__list">
        <li class="item" ><button class="button button__control button_race">Race</button></li>
        <li class="item" ><button class="button button__control button_reset" disabled>Reset</button></li>
        <li class="item" ><button class="button button_generate">Generate cars</button></li>
      </ul>
    </div>
    <div class="garage-page__body garage"></div>
  </div>
  </section>
`;

export const WINNERS_PAGE = `
  <section class="page winners-page _hidden"></section>
`;

export const PAGINATION = `
  <section class="pagination">
  <div class="pagination__container">
    <button class="button pagination__button pagination__button_previous" disabled>←</button>
    <button class="button pagination__button pagination__button_next" disabled>→</button>
  </div>
  </section>
`;

export const FOOTER = `
  <footer class="footer">
    <div class="footer__container">
      <a class="footer__logo" target="_blank" href="https://rs.school/">
        <img src="./assets/svg/rs_school_js.svg" alt="logo">
      </a>
        <a class="footer__link" target="_blank" href="https://www.linkedin.com/in/egor-dubovik-475a9223b/">EGOR DUBOVIK</a>
      <a class="footer__link" target="_blank" href="https://t.me/ego_dubovik">contact me</a>
    </div>
  </footer>
`;
