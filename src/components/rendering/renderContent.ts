export const renderContent = async (
  parentElement: HTMLElement,
  contentArr: string[]
): Promise<void> => {
  contentArr.forEach((content) => {
    parentElement.innerHTML += content;
  });
};
