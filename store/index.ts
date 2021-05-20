import { NuxtAxiosInstance } from '@nuxtjs/axios'

interface States {
  images: Array<string>
  filters: Array<string>
  filtered: String
}

export const state = (): States => ({
  images: [],
  filters: [],
  filtered: 'waifu',
})

export const mutations = {
  SET_IMAGES(state: States, images: Array<string>) {
    state.images = images
  },
  ADD_IMAGES(state: States, images: Array<string>) {
    images.forEach((image) => {
      if (!state.images.includes(image)) state.images.push(image)
    })
  },
  SET_FILTERS(state: States, filters: Array<string>) {
    state.filters = [...new Set(filters)]
  },

  SET_FILTERED(state: States, payload: { filter: string }) {
    state.filtered = payload.filter
  },
}

export const actions = {
  async fetchFilters({ commit }: any, payload: { $axios: NuxtAxiosInstance }) {
    try {
      const res = await payload.$axios.$get('/endpoints')
      commit('SET_FILTERS', res.sfw)
    } catch (err) { }
  },

  async fetchImages(
    { state, commit }: any,
    { $axios, action }: { $axios: NuxtAxiosInstance; action?: string }
  ) {
    try {
      const res = await $axios.$post(`/many/sfw/${state.filtered}`, {
        excludes: [],
      })
      if (action === 'set') {
        commit('SET_IMAGES', res.files)
      } else {
        commit('ADD_IMAGES', res.files)
      }
    } catch (err) { }
  },
}
