const saveStorage = (key, data) => {
  try {
    const localData = getStorage(key);
    localData.push(data);

    localStorage.setItem(key, JSON.stringify(localData));
  } catch (error) {
    console.log(error);
  }
};

const getStorage = key => {
  try {
    const defaultValue = [];
    const localData = JSON.parse(localStorage.getItem(key));
    if (localData) {
      return localData;
    }

    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  } catch (error) {
    console.log(error);
  }
};

// const removeItemStorage = (key, data) => {
//   try {
//     const localData = localStorage.getItem(key);

//     const filteredData = localData.filter(
//       element => element.name !== data.name
//     );
//     localStorage.setItem(key, filteredData);
//     return filteredData;
//   } catch (error) {
//     console.log(error);
//   }
// };

export { saveStorage, getStorage };
