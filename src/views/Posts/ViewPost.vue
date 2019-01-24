<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <v-card-title>
          <h1 class="primary--text">{{ post.title }}</h1>
        </v-card-title>
        <v-divider></v-divider>
        <v-img :src="post.imageUrl" style="max-height: 600px;"></v-img>
        <v-divider class="primary"></v-divider>
        <v-card-text>
          <div>
            <p class="font-italic">Posted at <span class="font-weight-bold">{{ post.date | date }}</span> by <span class="font-weight-bold">sad_c0der</span></p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem sit ratione tempore vel consequuntur quidem, iste doloremque at velit aut iusto aliquid nobis quasi molestias odio quas magni voluptas! Repudiandae.</p>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="primary">Like</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'ViewPost',
  props: ['id'],
  computed: {
    post () {
      return this.$store.getters.loadedPost(this.id)
    }
  }
}
</script>
