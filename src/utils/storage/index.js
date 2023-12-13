class StorageProxy {
  constructor(storageModel) {
    this.storage = storageModel
  }

  /**
   * 获取缓存值
   * @param {string} key
   * @returns
   */
  getItem(key) {
    return JSON.parse(this.storage.getItem(key))
  }

  /**
   * 设置缓存
   * @param {string} key
   * @param {any} value
   */
  setItem(key, value) {
    this.storage.setItem(key, JSON.stringify(value))
  }

  /**
   * 删除缓存
   * @param {string} key
   */
  removeItem(key) {
    this.storage.removeItem(key)
  }

  /**
   * 全部删除
   */
  clear() {
    this.storage.clear()
  }
}

//sessionStorage类
class sessionStorageProxy extends StorageProxy {
  constructor(sessionStorage) {
    super(sessionStorage)
  }
}

//localStorage类
class localStorageProxy extends StorageProxy {
  constructor(localStorage) {
    super(localStorage)
  }
}

export const storageSession = new sessionStorageProxy(sessionStorage)
export const storageLocal = new localStorageProxy(localStorage)
