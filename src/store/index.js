import Vue from 'vue'
import Vuex from 'vuex'
import DataService from '@/services/DataService.js'
import StorageService from '@/services/StorageService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    films: new Set(),

    loading: false,
    toastVisible: false,
    toastText: "I'm a toast",
    toastTime: 2000,
    toastTimer: 0
  },
  mutations: {
    addFilms(state, payload) {
      state.loading = true
      for (let film of payload) {
        //DecorateService.decorate(film)
        state.films.add(film)
      }
      Vue.set(state, 'top100', [...state.films])
      //DecorateService.decorate(state.films)
      state.loading = false
    },
    toggleFavourite(state, payload) {
      const filmArray = [...state.films]
      const filtered = filmArray.filter(val => val.id === payload.id)
      if (filtered.length) {
        const item = filtered.pop()
        if (typeof item.favourite === void 0) item.favourite = false
        item.favourite = !item.favourite
      }
    },
    saveFavourites(state) {
      const arrayFilms = [...state.films]
      StorageService.set(
        'favourites',
        arrayFilms.filter(val => val.favourite).map(val => val.id)
      )
    },
    setFavourites(state, payload) {
      if (!(payload instanceof Array)) payload = [payload]
      const films = [...state.films]
      for (const film of payload) {
        const item = films.filter(val => val.id === film).pop()
        if (item) item.favourite = true
      }
    },
    hideToast(state) {
      state.toastVisible = false
    },
    showToast(state) {
      state.toastVisible = true
    },
    setToastText(state, payload) {
      state.toastText = payload
    },
    setToastTimer(state, payload) {
      state.toastTimer = payload
    }
  },
  getters: {
    top100(state) {
      return [...state.films].slice(0, 100)
    },
    top250(state) {
      return state.top250
    },
    favourites(state) {
      return [...state.films].filter(val => val.favourite)
    }
  },
  actions: {
    async load({ commit, dispatch }) {
      const response = await DataService.getTop250()
      const data = response ? response.data.top250 : StorageService.get('films')

      // decorate films by favourite property
      for (const film of data) {
        film.favourite = false
      }

      commit('addFilms', data)
      dispatch('loadFavourites')
    },
    loadFavourites({ commit }) {
      const data = StorageService.get('favourites')
      if (data) {
        commit('setFavourites', data)
      }
    },
    toggleFavourite({ dispatch, commit }, payload) {
      commit('toggleFavourite', payload)
      commit('saveFavourites')
      dispatch(
        'showToast',
        payload.title +
          (payload.favourite
            ? ' added to favourites'
            : ' removed from favourites')
      )
    },
    removeFavorite({ commit }, payload) {
      commit('removeFromFavourites', payload)
      commit('saveFavourites')
    },
    async showToast({ state, commit }, payload) {
      const timeout = state.toastTime
      if (state.toastTimer) clearTimeout(state.toastTimer)
      commit(
        'setToastTimer',
        setTimeout(() => {
          commit('hideToast')
        }, timeout)
      )
      commit('showToast')
      commit('setToastText', payload)
    }
  },
  modules: {}
})
