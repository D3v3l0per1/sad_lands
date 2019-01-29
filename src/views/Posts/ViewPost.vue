<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 v-if="loading" text-xs-center style="margin: 25% 0;">
        <v-progress-circular indeterminate class="primary--text"></v-progress-circular>
      </v-flex>
      <v-flex xs12 v-else>
        <v-card>
          <v-card-title>
            <h1 class="primary--text">{{ post.title }}</h1>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <EditPost :post="post" />
              <DeletePost :post="post" />
            </template>
          </v-card-title>
          <v-divider></v-divider>
          <v-img :src="post.imageUrl" style="max-height: 600px;">
            <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
               <v-progress-circular indeterminate class="primary--text"></v-progress-circular>
            </v-layout>
          </v-img>
          <v-divider class="primary"></v-divider>
          <v-card-text>
            <div>
              <p class="font-italic">Posted at <span class="font-weight-bold">{{ post.date | date }}</span> by <span class="font-weight-bold">{{ post.creatorId }}</span></p>
              <v-divider class="mb-3"></v-divider>
              <p style="white-space: pre;">{{ post.description }}</p>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <LikeDislikePost :postId="post.id" v-if="userIsAuthentificated && !userIsCreator" />
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import EditPost from '../../components/Posts/Edit/EditPostDetailsDialog'
import DeletePost from '../../components/Posts/Edit/DeletePostDialog'
import LikeDislikePost from '../../components/Posts/LikeDislike/LikeBtn'

export default {
  name: 'ViewPost',
  props: ['id'],
  date () {
    return {
      viewImage: false
    }
  },
  components: {
    EditPost,
    DeletePost,
    LikeDislikePost
  },
  computed: {
    post () {
      return this.$store.getters.loadedPost(this.id)
    },
    loading () {
      return this.$store.getters.loading
    },
    userIsAuthentificated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    userIsCreator () {
      if (!this.userIsAuthentificated) {
        return false
      }
      return this.$store.getters.user.id === this.post.creatorId
    }
  },
  methods: {
    viewImage () {
      this.viewImage = true
    }
  }
}
</script>
