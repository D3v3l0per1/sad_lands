<template>
  <v-container>
    <v-layout row wrap v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <form @submit.prevent="onSignUp">
          <v-layout row wrap>

            <v-flex xs12>
              <v-card-title>
                <h1 class="primary--text">Sign Up</h1>
              </v-card-title>
            </v-flex>

            <v-flex xs12>
              <v-divider></v-divider>
            </v-flex>

            <v-flex xs12>
              <v-card-text>
                <v-layout row wrap>

                  <v-flex xs12>
                    <v-text-field name="email" label="Mail" id="email" v-model="email" type="email"></v-text-field>
                  </v-flex>

                  <v-flex xs12>
                    <v-text-field name="password" label="Password" id="password" v-model="password" type="password"></v-text-field>
                  </v-flex>

                  <v-flex xs12>
                    <v-text-field name="confirmPassword" label="Confirm Password" id="confirmPassword" v-model="confirmPassword" type="password" :rules="[comparePassword]"></v-text-field>
                  </v-flex>

                </v-layout>
              </v-card-text>
            </v-flex>

            <v-flex xs12>
              <v-divider></v-divider>
            </v-flex>

            <v-flex xs12>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="primary" type="submit" :disabled="loading" :loading="loading">SignUp</v-btn>
              </v-card-actions>
            </v-flex>

          </v-layout>
          </form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  computed: {
    comparePassword () {
      return this.password !== this.confirmPassword ? 'Password do not match' : ''
    },
    user () {
      return this.$store.getters.user
    },
    loading () {
      return this.$store.getters.loading
    },
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSignUp () {
      this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
    },
    onDismissed () {
      // console.log('Dismissed Alert')
      this.$store.dispatch('clearError')
    }
  }
}
</script>
