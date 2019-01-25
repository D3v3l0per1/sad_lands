<template>
  <v-btn flat fab class="primary--text" @click="onLike"><v-icon>{{ userLikedPost ? 'favorite' : 'favorite_border' }}</v-icon></v-btn>
</template>

<script>
export default {
  props: ['postId'],
  computed: {
    userLikedPost () {
      return this.$store.getters.user.likes.findIndex(postId => {
        return postId === this.postId
      }) >= 0
    }
  },
  methods: {
    onLike () {
      if (this.userLikedPost) {
        this.$store.dispatch('userDislikePost', this.postId)
      } else {
        this.$store.dispatch('userLikePost', this.postId)
      }
    }
  }
}
</script>
