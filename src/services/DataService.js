import axios from 'axios'

const apiClient = axios.create({
  baseURL: `https://imdb-top.surge.sh/`,
  // baseURL: `http://localhost:3000`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getTop250() {
    return apiClient.get('/db.json')
    // return apiClient.get('/top250')
  }
}
