<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-layout row wrap>
        <v-flex xs12 sm8 text-sm-left text-xs-center>
          <h1 class="primary--text">All Posts</h1>
        </v-flex>
        <v-flex xs12 sm4 text-sm-right text-xs-center>
          <v-btn class="primary" to="/posts/new">Create a Post</v-btn>
        </v-flex>
        <v-flex xs12>
          <hr class="primary">
        </v-flex>
      </v-layout>
    </v-flex>

    <v-flex xs12 class="mt-3">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 v-for="post in posts" :key="post.id" class="pa-2">
          <v-card>
            <v-img :src="post.imageUrl" height="200"></v-img>
            <v-divider></v-divider>
            <v-card-title>
              <div>
                <h2 class="primary--text">{{ post.title }}</h2>
                <span class="font-weight-bold">Posed at:</span> {{ post.date | date }} <br>
                <span class="font-weight-bold">Whoami:</span> sad_c0der
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
</template>

<script>
export default {
  name: 'AllPosts',
  computed: {
    posts () {
      return this.$store.getters.loadedPosts
    }
  }
}
</script>
