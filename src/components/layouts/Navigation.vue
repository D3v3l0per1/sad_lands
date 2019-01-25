<template>
  <div>

    <!-- ############ START TOOLBAR ############ -->

    <v-toolbar fixed>
    
      <v-toolbar-side-icon @click="sidenav = true"></v-toolbar-side-icon>
      
      <!-- Title -->
      <v-toolbar-title class="text-uppercase">
        <router-link to="/" tag="span" style="cursor: pointer;"><span class="font-weight-thin">sad</span>Lands</router-link>
      </v-toolbar-title>


      <v-spacer></v-spacer>
      
      <!-- SignUp & SignIn -->
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/signin" v-if="!userIsAuthenticated"><v-icon left>lock_open</v-icon>SignIn</v-btn>
        <v-btn flat to="signup" v-if="!userIsAuthenticated"><v-icon left>face</v-icon>SignUp</v-btn>
        <v-btn flat :to="'/profile/' + user.id" v-if="userIsAuthenticated"><v-icon left>face</v-icon>Profile</v-btn>
        <v-btn flat v-if="userIsAuthenticated" @click="onLogout"><v-icon left>exit_to_app</v-icon>Logout</v-btn>
      </v-toolbar-items>
    
    </v-toolbar>

    <!-- ############ START TOOLBAR ############ -->

    <!-- ############ START SIDENAV ############ -->

    <v-navigation-drawer fixed temporary v-model="sidenav">

      <!-- Title -->
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile class="text-uppercase">
              <span class="font-weight-thin">sad</span>Lands
            </v-list-tile>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider></v-divider>

      <!-- Items -->
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title" router :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>

        <v-list-tile v-if="userIsAuthenticated" @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Sign Out</v-list-tile-title>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>

    <!-- ############ END SIDENAV ############ -->


  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data () {
    return {
      sidenav: false,
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    menuItems () {
      let menuItems = [
        { title: 'Home', icon: 'dashboard', link: '/' },
        { title: 'Posts', icon: 'view_list', link: '/posts' },
        { title: 'About', icon: 'question_answer', link: '/about' },
        { title: 'Sign In', icon: 'lock_open', link: '/signin' },
        { title: 'Sign Up', icon: 'face', link: '/signup' }
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          { title: 'Home', icon: 'dashboard', link: '/' },
          { title: 'Posts', icon: 'view_list', link: '/posts' },
          { title: 'Create a Post', icon: 'note_add', link: '/posts/new' },
          { title: 'About', icon: 'question_answer', link: '/about' },
          { title: 'Contact', icon: 'person', link: `/contact` },
          { title: 'Profile', icon: 'face', link: `/profile/${this.user.id}` }
        ]
      }
      return menuItems
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  }
}
</script>
