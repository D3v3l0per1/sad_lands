<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-layout row wrap>
          <v-flex xs12 sm8 text-sm-left text-xs-center>
            <h1 class="primary--text">All Posts</h1>
          </v-flex>
          <v-flex xs12 sm4 text-sm-right text-xs-center v-if="userIsAuthentificated">
            <v-btn class="primary" to="/posts/new">Create a Post</v-btn>
          </v-flex>
          <v-flex xs12>
            <hr class="primary">
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs12 text-xs-center v-if="loading">
        <v-progress-circular indeterminate class="primary--text" style="margin: 20% 0;"></v-progress-circular>
      </v-flex>

      <v-flex xs12 class="mt-3" v-else>
        <v-layout row wrap>
          <v-flex xs12 sm6 md4 lg3 v-for="post in posts" :key="post.id" class="pa-2">
            <v-card>
              <v-img :src="post.imageUrl" height="200">
                <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                  <v-progress-circular indeterminate class="primary--text"></v-progress-circular>
                </v-layout>
              </v-img>
              <v-divider></v-divider>
              <v-card-title>
                <div style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
                  <h2 class="primary--text" style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">{{ post.title }}</h2>
                  <span class="font-weight-bold">Posed at:</span> {{ post.date | date }} <br>
                  <span class="font-weight-bold">Whoami:</span> {{ post.creatorId }}
                </div>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat class="primary--text" :to="'/posts/' + post.id">View More</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'AllPosts',
  computed: {
    posts () {
      return this.$store.getters.loadedPosts
    },
    loading () {
      return this.$store.getters.loading
    },
    userIsAuthentificated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  }
}
</script>
