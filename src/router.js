import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

import Home from './views/Home.vue'
import Orders from './views/Orders.vue'
import Login from "./views/Login";
import Register from "./views/Register";

Vue.use(Router)

const router = new Router({

    mode: 'history',

  routes: [
      {
            path: '/',
            name: 'home',
            component: Home
      },
      {
          path: '/orders',
          name: 'orders',
          component: Orders,
          // meta: { onlyAuth: true }
      },
      {
          path: '/login',
          name: 'login',
          component: Login,
          meta: { onlyGuest: true }
      },
      {
          path: '/register',
          name: 'register',
          component: Register,
          meta: { onlyGuest: true }
      },
  ],
})

router.beforeEach((to, from, next) => {

        //инициализация польз. данных
        store.commit({type: 'INIT_USER'})

        if (to.name === 'orders') {
            //инициализация данных о продуктах (сортировки)
            store.commit({type: 'INIT_ORDERS'})
        }

        if (to.matched.some(record => record.meta.onlyAuth)) {
            if (store.state.user.isAuth) {
                return next()
            }

            return next({name: 'login'})
        }

        if (to.matched.some(record => record.meta.onlyGuest)) {
            if (store.state.user.isAuth) {
                return next({name: 'home'})
            }

            return next()
        }

        next()
    }
)

export default router