import axios from "axios";
import router from '../../router';

export default {
    state: {
        item: {
            id: null,
            email: '',
            name: '-',
            token: '',
        },
        isAuth: false,
        errors: [],
    },

    actions: {

        loginUser({commit}, payload) {

            axios
                .post(this.state.API_URL+'users/login', {
                    email: payload['email'],
                    password: payload['password'],
                })
                .then( (response) => {
                    commit('LOGIN_USER', response.data)
                })
                .catch((error) => {
                    console.log(error)
                });
        },

        registerUser({commit}, payload) {
            axios
                .post(this.state.API_URL+'users/register', {
                    name: payload['name'],
                    email: payload['email'],
                    password: payload['password'],
                    password2: payload['password2'],
                })
                .then( (response) => {
                    commit('REGISTER_USER', response.data)
                })
                .catch((error) => {
                    console.log(error)
                });
        },
    },
    mutations: {

        LOGIN_USER(state, payload) {

            if (payload.errors) {
                state.errors = payload.errors
            }

            if (payload.status == 'success') {

                state.item = payload.user_data
                state.errors = []
                state.isAuth = true

                //сохраняем в localStorage
                localStorage.setItem('user', JSON.stringify(state.item));

                axios.defaults.headers.common['Authorization'] = 'Bearer '+state.item.token;

                //редирект на заказы
                router.push({path: 'orders'})
            }
        },

        LOGOUT_USER(state) {

            state.item = null
            state.isAuth = false
            localStorage.removeItem('user')
            router.push({path: 'login'})
        },

        //инизиализация данных пользователя
        INIT_USER(state) {

            if (state.isAuth === false) {

                let settings = JSON.parse(localStorage.getItem('user'))

                if (settings) {
                    state.item = settings
                    state.isAuth = true
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + settings.token;
                }
            }
        },

        //регистрация пользователя
        REGISTER_USER(state, payload) {
            if (payload.errors) {
                state.errors = payload.errors
            }

            if (payload.status == 'success') {
                //редирект на вход
                router.push({path: 'login'})
            }
        }
    },
}