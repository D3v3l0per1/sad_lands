<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn slot="activator" flat fab small class="primary--text">
      <v-icon>edit</v-icon>
    </v-btn>

    <v-card>

      <v-card-title>
        <h1 class="primary--text">Edit Post</h1>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <v-text-field name="title" label="Title" id="title" v-model="editedTitle" required></v-text-field>
        <v-textarea name="description" label="Description" id="description" v-model="editedDescription" required></v-textarea>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat class="red--text" @click="editDialog = false">Close</v-btn>
        <v-btn flat class="primary--text" @click="onSaveChanges">Save</v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['post'],
  data () {
    return {
      editDialog: false,
      editedTitle: this.post.title,
      editedDescription: this.post.description
    }
  },
  methods: {
    onSaveChanges () {
      if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '') {
        return
      }
      this.editDialog = false
      this.$store.dispatch('updatePostData', {
        id: this.post.id,
        title: this.editedTitle,
        description: this.editedDescription
      })
    }
  }
}
</script>
