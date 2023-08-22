import { getUpdateElements } from './getElements';
import { SettingElements } from '../../types/base.types';

export const removeSelection = async (event: Event): Promise<void> => {
  const targetElement = event.target as HTMLElement;

  if (!targetElement.closest('.updation-form')) {
    const selectButtons = document.querySelectorAll('.car-button_select');
    selectButtons.forEach((button) => {
      button.classList.remove('_selected');
    });

    if (!targetElement.classList.contains('car-button_select')) {
      const settingElements = getUpdateElements();

      settingElements.forEach((element) => {
        element.disabled = true;
      });

      document.removeEventListener('click', removeSelection);
    }
  }
};

export const addSelection = (selectButton: HTMLElement, settingElements: SettingElements): void => {
  settingElements.forEach((element) => {
    selectButton.classList.add('_selected');
    element.disabled = false;

    if (element.classList.contains('form__input-name')) {
      element.focus();
      element.value = selectButton.dataset.name as string;
    }

    if (element.classList.contains('form__input-color')) {
      element.value = selectButton.dataset.color as string;
    }

    if (element.classList.contains('form__button_update')) {
      element.dataset.id = selectButton.dataset.id;
    }

    document.addEventListener('click', removeSelection);
  });
};
