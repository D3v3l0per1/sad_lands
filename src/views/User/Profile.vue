<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <h1 class="primary--text">Profile</h1>
        <hr class="primary mb-2">
      </v-flex>
      <v-flex xs12 text-xs-center style="margin: 20% 0;" v-if="loading">
        <v-progress-circular indeterminate class="primary--text"></v-progress-circular>
      </v-flex>
      <v-flex xs12 v-else>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12 sm4 text-xs-center>
              <v-img :src="user.photoURL" height="150px" width="150px" style="border-radius: 50%;"></v-img>
            </v-flex>
            <v-flex xs12 sm8 >
              <p class="title">
                Username: <span class="font-weight-light">{{ user.displayName }}</span> <br>
                E-Mail: <span class="font-weight-light">{{ user.email }}</span> <br>
                User-Id: <span class="font-weight-light">{{ user.id }}</span>
              </p>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs12>
        <v-divider></v-divider>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.getters.user
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>
