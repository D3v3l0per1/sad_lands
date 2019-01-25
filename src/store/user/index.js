import firebase from 'firebase/app'

export default {
  state: {
    user: null
  },
  mutations: {
    userLikePost (state, payload) {
      const id = payload.id
      if (state.user.likes.findIndex(post => post.id === id) >= 0) {
        return
      }
      state.user.likes.push(id)
      state.user.fbKeys[id] = payload.fbKey
    },
    userDislikePost (state, payload) {
      const likes = state.user.likes
      likes.splice(likes.findIndex(post => post.id === payload), 1)
      Reflect.deleteProperty(state.user.fbKeys, payload)
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    userLikePost ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      firebase.database().ref('/users/' + user.id).child('/likes/')
        .push(payload)
        .then(
          data => {
            commit('setLoading', false)
            commit('userLikePost', {id: payload, fbKey: data.key})
          }
        )
        .catch(
          err => {
            console.log(err)
            commit('setLoading', false)
          }
        )
    },
    userDislikePost ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      if (!user.fbKeys) {
        return
      }
      const fbKey = user.fbKeys[payload]
      firebase.database().ref('/users/' + user.id + '/likes/').child(fbKey)
        .remove()
        .then(
          () => {
            commit('setLoading', false)
            commit('userDislikePost', payload)
          }
        )
        .catch(
          err => {
            console.log(err)
            commit('setLoading', false)
          }
        )
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              displayName: '',
              photoURL: 'https://firebasestorage.googleapis.com/v0/b/sadlands-ea794.appspot.com/o/system%2Fprofile_placeholder.png?alt=media&token=4c7f3337-6112-41df-ac54-05c3e717a85e',
              likes: [],
              fbKeys: {}
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          err => {
            commit('setLoading', false)
            commit('setError', err)
            console.log(err)
          }
        )
    },
    AuthentificateWithGoogle ({commit}) {
      commit('setLoading', true)
      var provider = new firebase.auth.GoogleAuthProvider()
      provider.addScope('profile')
      provider.addScope('email')
      firebase.auth().signInWithPopup(provider)
        .then(
          user =>  {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              likes: [],
              fbKeys: {}
            }
            console.log(newUser)
            var googleData = firebase.auth().currentUser
            commit('setUser', {
              ...user,
              displayName: googleData.displayName,
              email: googleData.email,
              photoURL: googleData.photoURL
            })
          console.log(user)
        })
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              likes: [],
              fbKeys: {}
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          err => {
            commit('setLoading', false)
            commit('setError', err)
            console.log(err)
          }
        )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {
        id: payload.uid,
        displayName: payload.displayName,
        email: payload.email,
        photoURL: payload.photoURL,
        likes: [],
        fbKeys: {}
      })
    },
    fetchUserData ({commit, getters}) {
      commit('setLoading', true)
      firebase.database().ref('/users/' + getters.user.id + '/likes/').once('value')
        .then(
          data => {
            const dataPairs = data.val()
            let likes = []
            let swappedPairs = {}
            for (let key in dataPairs) {
              likes.push(dataPairs[key])
              swappedPairs[dataPairs[key]] = key
            }
            const updatedUser = {
              id: getters.user.id,
              displayName: getters.user.displayName,
              email: getters.user.email,
              photoURL: getters.user.photoURL,
              likes: likes,
              fbKeys: swappedPairs
            }
            commit('setLoading', false)
            commit('setUser', updatedUser)
            // console.log(likes)
            // console.log(swappedPairs)
          }
        )
        .catch(
          err => {
            console.log(err)
            commit('setLoading', false)
          }
        )
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}