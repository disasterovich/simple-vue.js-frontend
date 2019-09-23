import Vue from 'vue'
import Vuex from 'vuex'
import OrdersModule from './store/modules/orders'
import OrderModule from './store/modules/order'
import UserModule from './store/modules/user'
import SettingsModule from './store/modules/settings'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        HOST: 'http://BACKEND_HOST_HERE/',
        API_URL: 'http://BACKEND_HOST_HERE/api/',
        PER_PAGE: 6, //объектов на странице
    },
    modules: {
        orders: OrdersModule,
        order: OrderModule,
        user: UserModule,
        settings: SettingsModule,
    },
    strict: process.env.NODE_ENV !== 'production',
})
