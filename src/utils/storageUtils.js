const getItem = async (type) => {
  let lstore = window.localStore;

  try {
    const item = await lstore?.get(type);

    const now = new Date().getTime();
    if (item && item.timestamp && now > item.timestamp) {
      lstore.remove(type);
      return undefined;
    }

  //  console.info("useStoarge: getItem: successfully fetched from store", type);

    return item?.data;
  } catch (error) {
    console.error("useStorage: getItem: failed fetching from store", type);
    return undefined;
  }
};

const setItem = async (type, data, timestamp) => {
  let lstore = window.localStore;

  try {
    await lstore.set(type, {
      data,
      timestamp,
    });

    console.info("useStoarge: setItem: successfully added to store", type);
  } catch (error) {
    console.error("useStorage: setItem: failed adding to store", type);
  }
};

const removeItem = async (type) => {
  let lstore = window.localStore;

  try {
    lstore.remove(type);

    console.info(
      "useStoarge: removeItem: successfully removed from store",
      type
    );
  } catch (error) {
    console.error("useStorage: removeItem: failed removing from store", type);
  }
};

export { getItem, setItem, removeItem };
