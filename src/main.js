import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'

import DateFilter from './filters/date'

import AlertCmp from './components/Shared/Alert'

Vue.filter('date', DateFilter)

Vue.component('app-alert', AlertCmp)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyAVbEp1xT1l9JY9dj94MuQ-nVC5FVICLvc',
      authDomain: 'sadlands-ea794.firebaseapp.com',
      databaseURL: 'https://sadlands-ea794.firebaseio.com',
      projectId: 'sadlands-ea794',
      storageBucket: 'gs://sadlands-ea794.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadPosts')
  }
}).$mount('#app')
