<template>
  <v-app dark>
    <Navigation />

    <v-container class="mt-5">
      <router-view></router-view>
    </v-container>

    <Footer />
  </v-app>
</template>

<script>
import Navigation from './components/layouts/Navigation'
import Footer from './components/layouts/Footer'

export default {
  name: 'App',
  components: {
    Navigation,
    Footer
  },
  data () {
    return {
      //
    }
  }
}
</script>
