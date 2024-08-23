type setItemToLocalStorageProp = {
  value: string;
  itemName: string;
};

export const setItemToLocalStorage = ({
  value,
  itemName,
}: setItemToLocalStorageProp) => {
  localStorage.setItem(itemName, value);
};

export const getItemFromLocalStorage = (itemName: string) => {
  const item = localStorage.getItem(itemName);
  return item;
};
