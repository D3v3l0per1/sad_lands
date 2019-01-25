<template>
  <v-container>
    <v-layout row wrap>

      <v-flex xs12 text-xs-center v-if="loading">
        <v-progress-circular indeterminate class="primary--text" style="margin: 15% 0;"></v-progress-circular>
      </v-flex>

      <v-flex xs12 v-else>
        <v-carousel>
          <v-carousel-item v-for="post in posts" :key="post.id" :src="post.imageUrl" @click="onLoadPost(post.id)">
            <div class="title">
              {{ post.title }}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>

      <v-flex xs12 class="mt-4">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus eaque modi nostrum assumenda nam animi praesentium ullam molestias? Id tempore, iusto eligendi eum rerum excepturi exercitationem ducimus ipsa ad. Temporibus!</p>
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
  .title {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,.5);
    color: white;
    font-size: 2em;
    padding: 20px;
  }
</style>
