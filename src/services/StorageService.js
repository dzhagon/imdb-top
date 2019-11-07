const storageSalt = 'imdbsvc_'
export default {
  get(key) {
    return JSON.parse(localStorage.getItem(storageSalt + key))
  },
  set(key, value) {
    return localStorage.setItem(storageSalt + key, JSON.stringify(value))
  }
}
