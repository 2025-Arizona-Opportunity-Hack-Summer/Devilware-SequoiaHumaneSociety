// import { compareTwoArrays, compareTwoObjects } from "./comparisonData";

class SessionStorage {
  /**
  * Store data in session storage
  @param {string} id id is a key for access data
  @param {*} data data is a value stored in sesstion storage
  @returns {void} void function
  **/
  static setItem(id, data) {
    sessionStorage.setItem(id, JSON.stringify(data));
  }

  /**
  * Get data in sesstion storage
  @param {string} id id is a key for access data
  @returns {null | *} null if data does not exist in session storage, otherwise return stored value  
  **/
  static getItem(id) {
    const data = JSON.parse(sessionStorage.getItem(id));
    return data;
  }

  static removeItem(id) {
    sessionStorage.removeItem(id);
  }

  // static detectChanges(id, updatedData) {
  //   const data = JSON.parse(sessionStorage.getItem(id));
  //   if (typeof data === "object") {
  //     if (Array.isArray(data) == true) {
  //       return compareTwoArrays(data, updatedData);
  //     } else {
  //       return compareTwoObjects(data, updatedData);
  //     }
  //   } else {
  //     return data === updatedData;
  //   }
  // }
}

export default SessionStorage;
