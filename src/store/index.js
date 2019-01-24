import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedPosts: [
      {
        id: '1',
        title: 'This is Post One',
        description: 'lorem ispum dolor it samet laldnfgisdfnbg sdnglöisjd ng',
        imageUrl: 'https://vignette.wikia.nocookie.net/austinally/images/1/14/Random_picture_of_shark.png/revision/latest?cb=20150911004230',
        date: new Date()
      },
      {
        id: '2',
        title: 'This Poist Tweo lol',
        description: 'lorem ispum dolor it samet laldnfgisdfnbg sdnglöisjd ng',
        imageUrl: 'https://media1.tenor.com/images/5c406b927ec59a31eb67e3366f3121ef/tenor.gif?itemid=11909469',
        date: new Date()
      },
      {
        id: '3',
        title: 'WTH IS Going',
        description: 'lorem ispum dolor it samet laldnfgisdfnbg sdnglöisjd ng',
        imageUrl: 'https://www.toonboom.com/sites/default/files/opengraph/Random-Zone-D.jpg',
        date: new Date()
      }
    ],
    user: null
  },
  mutations: {
    createPost (state, payload) {
      state.loadedPosts.push(payload)
    }
  },
  actions: {
    createPost ({commit}, payload) {
      const post = {
        title: payload.title,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: 'u34zvf3'
      }
      // reach out to db and store 
      commit('createPost', post)
    }
  },
  getters: {
    loadedPosts (state) {
      return state.loadedPosts.sort((postA, postB) => {
        return postA.date < postB.date
      })
    },
    featuredPosts (state, getters) {
      return getters.loadedPosts.slice(0, 5)
    },
    loadedPost (state) {
      return (postId) => {
        return state.loadedPosts.find((post) => {
          return post.id === postId
        })
      }
    }
  }
})
