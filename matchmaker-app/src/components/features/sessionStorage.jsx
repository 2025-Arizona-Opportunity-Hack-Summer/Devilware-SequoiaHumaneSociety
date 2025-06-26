class SessionStorage {
  /**
  * Store data in session storage
  @param {id} id id | String is a key for access data
  @param {data} data data is a value stored in sesstion storage
  @returns {} void function
  **/
  static setItem(id, data) {
    sessionStorage.setItem(id, JSON.stringify(data));
  }

  /**
  * Get data in sesstion storage
  @param {id} id id is a key for access data
  @returns null if data does not exist in session storage, otherwise return stored value  
  **/
  static getItem(id) {
    const data = JSON.parse(sessionStorage.getItem(id));

    return data;
  }
}

export default SessionStorage;
