<template>
  <v-container>
    <v-layout row wrap>

      <v-flex xs12 text-xs-center v-if="loading">
        <v-progress-circular indeterminate class="primary--text" style="margin: 15% 0;"></v-progress-circular>
      </v-flex>

      <v-flex xs12 v-else>
        <v-carousel>
          <v-carousel-item v-for="post in posts" :key="post.id" :src="post.imageUrl">
            <div class="banner-text">
              <h2 class="primary--text">{{ post.title }}</h2>
              <hr class="mt-1 mb-3">
              <p style="width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{ post.description }}</p>
              <hr>
              <v-layout row wrap>
                <v-flex xs12 text-xs-right>
                  <v-btn flat class="primary--text" @click="onLoadPost(post.id)">View Post</v-btn>
                </v-flex>
              </v-layout>
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>

      <v-flex xs12 sm6 text-xs-center text-sm-right>
        <v-btn flat large class="primary--text my-4" to="/posts/new">Create a Post</v-btn> <span class="hidden-xs-only">|</span>
      </v-flex>

      <v-flex xs12 sm6 text-xs-center text-sm-left>
        <v-btn flat large class="primary--text my-4" to="/posts">View all Posts</v-btn>
      </v-flex>

      <v-flex xs12 class="pa-2">
        <h1 class="primary--text headline">Latest Posts</h1>
        <hr class="primary">
      </v-flex>

      <v-flex xs12 text-xs-center v-if="loading">
        <v-progress-circular indeterminate class="primary--text" style="margin: 15% 0;"></v-progress-circular>
      </v-flex>

      <v-flex xs12 class="mt-2" v-else>
        <v-layout row wrap>
          <v-flex xs12 sm6 md4 lg3 class="pa-2" v-for="post in latestPosts" :key="post.id">
            <v-card>
              <v-img :src="post.imageUrl" height="150px" router :to="'/posts/' + post.id">
                <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                  <v-progress-circular indeterminate class="primary--text"></v-progress-circular>
                </v-layout>
              </v-img>
              <v-divider class="primary"></v-divider>
              <v-card-title>
                <div style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
                  <h3 class="title primary--text font-weight-light" style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">{{ post.title }}</h3>
                  <hr class="mt-1 mb-2">
                  <span class="font-weight-bold">Posed at:</span> {{ post.date | date }} 
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

      <v-flex xs12 sm6 class="mt-3 pa-2">
        <h1 class="primary--text headline">Top Posts</h1>
        <hr class="primary">

      </v-flex>

      <v-flex xs12 sm6 class="pa-2 mt-3">
        <h1 class="primary--text headline">Top Comments</h1>
        <hr class="primary">

      </v-flex>

      <v-flex xs12 class="pa-2">
        <h1 class="primary--text headline">Posts <span class="white--text">({{ allPosts.length }})</span> </h1>
        <hr class="primary">
      </v-flex>

      <v-flex xs12 text-xs-center v-if="loading">
        <v-progress-circular indeterminate class="primary--text" style="margin: 15% 0;"></v-progress-circular>
      </v-flex>

      <v-flex xs12 class="mt-2" v-else>
        <v-layout row wrap>
          <v-flex xs12 sm6 md4 lg3 class="pa-2" v-for="post in allPosts" :key="post.id">
            <v-card>
              <v-img :src="post.imageUrl" height="150px" router :to="'/posts/' + post.id">
                <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                  <v-progress-circular indeterminate class="primary--text"></v-progress-circular>
                </v-layout>
              </v-img>
              <v-divider class="primary"></v-divider>
              <v-card-title>
                <div style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
                  <h3 class="title primary--text font-weight-light" style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">{{ post.title }}</h3>
                  <hr class="mt-1 mb-2">
                  <span class="font-weight-bold">Posed at:</span> {{ post.date | date }} 
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
    name: 'Home',
    computed: {
      posts () {
        return this.$store.getters.featuredPosts
      },
      allPosts () {
        return this.$store.getters.loadedPosts
      },
      latestPosts () {
        return this.$store.getters.latestPosts
      },
      loading () {
        return this.$store.getters.loading
      },
      user () {
        return this.$store.getters.user
      }
    },
    methods: {
      onLoadPost (id) {
        this.$router.push('/posts/' + id)
      }
    }
  }
</script>

<style scoped>
  .banner-text {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,.7);
    color: white;
    padding: 20px;
  }
</style>
