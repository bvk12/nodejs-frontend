import { Storage } from "@ionic/storage";

window.localStore = null;

export const initLocalStorage = async () => {
  if (window.localStore === null) {
   // console.info("Creating store", window.localStore);

    let storage = new Storage({
      name: "visualpath",
    });
    window.localStore = await storage.create();

    //console.info("Created store", window.localStore);
  }
};

(function () {
  initLocalStorage();
})();
