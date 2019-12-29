import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home/Home'
import LoginPage from '../views/login/LoginPage'
import PublicosPage from '../views/login/PublicosPage'
import LandingPage from '../views/login/LandingPage'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Início', component: Home },
    { path: '/login', component: LoginPage },
    { path: '/publicos', component: PublicosPage },
    { path: '/landingPage', component: LandingPage }
  ]
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/landingPage', '/login', '/publicos']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('usuario')
  if (authRequired && !loggedIn) {
    return next('/landingPage')
  }
  next()
})
