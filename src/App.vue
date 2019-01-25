<template>
  <v-app dark>
    <Navigation />

    <router-view class="mt-5"></router-view>

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
