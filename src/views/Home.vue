<template>
  <v-layout row wrap>
    <v-flex xs12>
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
</template>

<script>
  export default {
    name: 'Home',
    computed: {
      posts () {
        return this.$store.getters.featuredPosts
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
