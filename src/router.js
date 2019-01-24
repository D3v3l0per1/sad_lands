import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import AllPosts from './views/Posts/AllPosts'
import ViewPost from './views/Posts/ViewPost'
import CreatePost from './views/Posts/CreatePost'

import SignUp from './views/User/SignUp'
import SignIn from './views/User/SignIn'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/posts',
      name: 'AllPosts',
      component: AllPosts
    },
    {
      path: '/posts/new',
      name: 'CreatePost',
      component: CreatePost
    },
    {
      path: '/posts/:id',
      name: 'ViewPost',
      props: true,
      component: ViewPost
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('./views/Contact')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
