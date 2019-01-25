<template>
  <v-container>
    <v-layout row wrap>

      <v-flex xs12 sm6 text-xs-center text-sm-right>
        <v-btn flat large class="primary--text mt-4 mb-4" to="/posts/new">Create a Post</v-btn> <span class="hidden-xs-only">|</span>
      </v-flex>

      <v-flex xs12 sm6 text-xs-center text-sm-left>
        <v-btn flat large class="primary--text mt-4 mb-4" to="/posts">View all Posts</v-btn>
      </v-flex>

      <v-flex xs12 text-xs-center v-if="loading">
        <v-progress-circular indeterminate class="primary--text" style="margin: 15% 0;"></v-progress-circular>
      </v-flex>

      <v-flex xs12 v-else>
        <v-carousel>
          <v-carousel-item v-for="post in posts" :key="post.id" :src="post.imageUrl" @click="onLoadPost(post.id)">
            <div class="ttitle">
              {{ post.title }}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>

      <v-flex xs12 text-xs-center v-if="loading">
        <v-progress-circular indeterminate class="primary--text" style="margin: 15% 0;"></v-progress-circular>
      </v-flex>

      <v-flex xs12 class="mt-2" v-else>
        <v-layout row wrap>
          <v-flex xs12 sm6 md4 lg3 class="pa-2" v-for="post in posts" :key="post.id">
            <v-card>
              <v-img :src="post.imageUrl" height=150px>
                <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                  <v-progress-circular indeterminate class="primary--text"></v-progress-circular>
                </v-layout>
              </v-img>
              <v-divider class="primary"></v-divider>
              <v-card-title>
                <div>
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

      <v-flex xs12 class="mt-4">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati odio quasi odit, optio doloribus, excepturi perferendis consectetur sunt porro nostrum magni assumenda molestiae aspernatur iusto beatae quam dolores. Officia, incidunt!</p>
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
      loading () {
        return this.$store.getters.loading
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
  .ttitle {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,.5);
    color: white;
    font-size: 2em;
    padding: 20px;
  }
</style>
