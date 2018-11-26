import axios from 'axios';

export default {
    state: {
        item: {
            id: null,
            clientName: '',
            clientPhone: '',
            departureAddress: '',
            departureFromDate: '',
            departureFromTime: '',
            departureToDate: '',
            departureToTime: '',
        },

        loading: false,
        errors: [],
    },
    actions: {
        loadOrder ({commit}, payload) {
            axios
                .get(this.state.API_URL+'orders/'+payload.id)
                .then( (response) => {
                    commit({type: 'LOAD_ORDER',data: response.data})
                })
                .catch((error) => {
                    console.log(error)
                });
        },
        deleteOrder ({commit}, payload) {
            axios
                .delete(this.state.API_URL+'orders/'+payload.id)
                .then( (response) => {
                    this.dispatch({'type': 'loadOrders'})
                })
                .catch((error) => {
                    console.log(error)
                });
        },
        saveOrder ({commit}, payload) {

            let form_data = new FormData()
            for ( let key in this.state.order.item ) {

                let value = this.state.order.item[key]

                form_data.append(key, value);
            }

            //редактирование существуеющего
            if (this.state.order.item.id) {
                axios
                    .patch(this.state.API_URL+'orders/'+this.state.order.item.id, form_data)
                    .then( (response) => {

                        //commit({type: 'SAVE_ORDER',data: response.data})
                        commit('SAVE_ORDER', response.data)

                        //обновляем список товаров
                        this.dispatch({'type': 'loadOrders'})
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            }
            //создание нового
            else {
                axios
                    .post(this.state.API_URL+'orders', form_data)
                    .then( (response) => {

                        //commit({type: 'SAVE_ORDER',data: response.data})
                        commit('SAVE_ORDER', response.data)

                        //обновляем список товаров
                        this.dispatch({'type': 'loadOrders'})
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            }
        },

    },
    mutations: {
        //обновление соотв. значения
        UPDATE_ORDER_FIELD(state, payload) {
            state.item[payload.key] = payload.value
        },

        //загрузка существ.
        LOAD_ORDER(state, payload) {
            state.item = payload.data
            state.loading = false
        },

        //созд. нового продукта
        ADD_ORDER(state, payload) {
            state.errors = []

            state.item.id = null
            state.item.clientName = ''
            state.item.clientPhone = ''
            state.item.departureAddress = ''
            state.item.departureFromDate = ''
            state.item.departureFromTime = ''
            state.item.departureToDate = ''
            state.item.departureToTime = ''
        },

        SET_ORDER_LOADING_STATE(state, payload) {
            state.loading = payload.value
        },

        SAVE_ORDER(state, payload) {
            if (payload.errors) {
                state.errors = payload.errors
            }
        },

    },
}