<template>
  <v-layout row wrap>
    <v-flex xs12>
      <form @submit.prevent="onCreatePost">
        <v-card>
          <v-card-title>
            <v-layout row wrap>
              <v-flex xs12>
                <h1 class="primary--text">Create a new Post</h1>
                <hr class="primary">
              </v-flex>
              <v-flex xs12>
                <v-text-field name="title" label="Title" id="title" v-model="title"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <img :src="imageUrl" alt="" style="width: 100%;">
              </v-flex>
              <v-flex xs12>
                <v-text-field name="imageUrl" label="Image Url" id="imageUrl" v-model="imageUrl"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea name="description" label="Description" id="description" v-model="description"></v-textarea>
              </v-flex>
            </v-layout>  
          </v-card-title>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat class="primary--text" :disabled="!formIsValid" type="submit">Create Post</v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      imageUrl: '',
      description: '',
    }
  },
  computed: {
    formIsValid () {
      return this.title !== '' && 
      this.imageUrl !== '' && 
      this.description !== ''
    }
  },
  methods: {
    onCreatePost () {
      if (!this.formIsValid) {
        return
      }
      const postData = {
        title: this.title,
        imageUrl: this.imageUrl,
        description: this.description,
        date: new Date()
      }
      this.$store.dispatch('createPost', postData)
      this.$router.push('/posts')
    }
  }
}
</script>
