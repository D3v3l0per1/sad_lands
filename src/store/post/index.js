import * as firebase from 'firebase'

export default {
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
    ]
  },
  mutations: {
    setLoadedPosts (state, payload) {
      state.loadedPosts = payload
    },
    createPost (state, payload) {
      state.loadedPosts.push(payload)
    },
    updatePost (state, payload) {
      const post = state.loadedPosts.find(post => {
        return post.id === payload.id
      })
      if (payload.title) {
        post.title = payload.title
      }
      if (payload.description) {
        post.description = payload.description
      }
    },
    deletePost (state, payload) {
      const post = state.loadedPosts.find(post => {
        return post.id === payload.id
      })
      state.loadedPosts.slice(post)
    }
  },
  actions: {
    loadPosts ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('posts').once('value')
        .then(
          (data) => {
            const posts = []
            const obj = data.val()
            for (let key in obj) {
              posts.push({
                id: key,
                title: obj[key].title,
                imageUrl: obj[key].imageUrl,
                description: obj[key].description,
                date: obj[key].date,
                flex: obj[key].flex,
                creatorId: obj[key].creatorId
              })
            }
            commit('setLoadedPosts', posts)
            commit('setLoading', false)
          }
        )
        .catch(
          err => {
            commit('setLoading', false)
            console.log(err)
          }
        )
    },
    createPost ({commit, getters}, payload) {
      const post = {
        title: payload.title,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      let imageUrl
      let key
      firebase.database().ref('posts').push(post)
        .then(
          (data) => {
            key = data.key
            return key
          }
        )
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('posts/' + key + '.' + ext).put(payload.image)
        })
        .then(fileData => {
          return firebase.storage().ref(fileData.metadata.fullPath).getDownloadURL()
        })
        .then((url) => {
          return firebase.database().ref('posts').child(key).update({imageUrl: url})
        })
        .then(() => {
            commit('createPost', {
              ...post,
              imageUrl: imageUrl,
              id: key
            })
        })
        .catch(
          err => {
            console.log(err)
          }
        )
    },
    updatePostData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      firebase.database().ref('posts').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updatePost', payload)
        })
      .catch(
        err => {
          console.log(err)
        }
      )
    },
    deletePost({commit}, payload) {
      commit('setLoading', true)
      // commit('deletePost', payload)
      firebase.database().ref('posts').child(payload.id).remove()
        .then(
          () => {
            commit('setLoading', false)
            commit('deletePost', payload)
          }
        )
        .catch(
          err => {
            console.log(err)
          }
        )
    }
  },
  getters: {
    loadedPosts (state) {
      return state.loadedPosts.sort((postA, postB) => {
        return postA.date < postB.date
      })
    },
    featuredPosts (state, getters) {
      return getters.loadedPosts.slice(0, 4)
    },
    latestPosts (state, getters) {
      return getters.loadedPosts.slice(0, 4)
    },
    loadedPost (state) {
      return (postId) => {
        return state.loadedPosts.find((post) => {
          return post.id === postId
        })
      }
    },
    usersPosts (state, getters) {
      return state.loadedPosts.sort((post) => {
        return getters.user.id === post.creatorId
      })
    }
  }
}
