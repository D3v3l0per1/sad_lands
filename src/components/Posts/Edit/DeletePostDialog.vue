<template>
  <v-dialog persistent width="300px" v-model="deleteDialog">
    <v-btn slot="activator" fab flat small class="red--text"><v-icon>clear</v-icon></v-btn>

    <v-card>

      <v-card-title>
        <h1 class="primary--text">Delete Post</h1>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <p>Are u shure u want to delete the Post?</p>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat class="red--text" @click="deleteDialog = false">Abort</v-btn>
        <v-btn flat class="green--text" @click="confirmDelete">Confirm</v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['post'],
  data () {
    return {
      deleteDialog: false
    }
  },
  methods: {
    confirmDelete () {
      this.deleteDialog = false
      this.$store.dispatch('deletePost', { id: this.post.id })
      this.$router.push('/')
    }
  }
}
</script>
