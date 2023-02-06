const saveStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

const getStorage = key => {
  try {
    const localData = localStorage.getItem(key);
    return localData === null ? [] : JSON.parse(localData);
  } catch (error) {
    console.log(error);
  }
};

export { saveStorage, getStorage };
