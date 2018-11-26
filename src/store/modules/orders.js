import axios from 'axios';

export default {
    state: {
        items: [],
        search: {
            clientName: '',
        },
        sort: {
            id: 'asc',
            client_name: 'desc',
        },
        pagination: {}, //для v-pagination
    },
    getters: {
        ordersSortString: state => {
            let res = []

            for (let i in state.sort) {
                if (state.sort[i] == 'desc') {res.push('-'+i)}
                else if (state.sort[i] == 'asc') {res.push(i)}
            }

            return res.join(',')
        }
    },
    actions: {
        loadOrders ({commit}, payload) {

            payload['page'] = payload['page'] || 1
            payload['per-page'] = payload['per-page'] || this.state.PER_PAGE

            axios
                .get(this.state.API_URL+'orders?client_name='+this.state.orders.search.clientName+'&page='+payload['page']+'&per-page='+payload['per-page']+'&sort='+this.getters.ordersSortString)
                .then( (response) => {
                    commit({
                        type: 'LOAD_ORDERS',
                        data: response.data,
                    })

                    commit({type: 'SET_PAGINATION', pagination: {
                        'current-page': parseInt(response.headers['x-pagination-current-page']),
                        'total-count': parseInt(response.headers['x-pagination-total-count']),
                        'page-count': parseInt(response.headers['x-pagination-page-count']),
                        'per-page': parseInt(response.headers['x-pagination-per-page']),
                    }
                    })

                })
                .catch((error) => {
                    console.log(error)
                });
        },

    },
    mutations: {

        //set current page
        SET_PAGINATION(state, payload) {
            state.pagination = payload.pagination
        },

        LOAD_ORDERS(state, payload) {
            state.items = payload.data
        },

        UPDATE_ORDERS_SEARCH_FIELD(state, payload) {
            state.search.clientName = payload.value
        },

        SET_ORDERS_SORT(state, payload) {

            if (state.sort[payload.value] == 'asc') {
                state.sort[payload.value] = 'desc'
            }
            else if (state.sort[payload.value] == 'desc'){
                state.sort[payload.value] = ''
            }
            else {
                state.sort[payload.value] = 'asc'
            }

            //сохраняем в localStorage
            let orders = JSON.parse(localStorage.getItem('orders')) || {}
            orders.sort = state.sort
            localStorage.setItem('orders', JSON.stringify(orders));
        },

        INIT_ORDERS(state) {

            let settings = JSON.parse(localStorage.getItem('orders'))

            if (settings && settings.sort) {
                state.sort = settings.sort
            }
        },
    },
}