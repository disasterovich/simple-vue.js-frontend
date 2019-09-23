import axios from 'axios';
import moment from 'moment'

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

        dialog: false, //отображ. v-dialog

        loading: false,
        errors: [],
    },
    actions: {
        loadOrder ({commit}, payload) {
            axios
                .get(this.state.API_URL+'orders/'+payload.id)
                .then( (response) => {
                    commit('LOAD_ORDER', response.data)
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
                        commit('SAVE_ORDER', response.data)
                        //обновляем список заказов
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
                        commit('SAVE_ORDER', response.data)
                        //обновляем список заказов
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
            state.item.id = payload.order_data.id
            state.item.clientName = payload.order_data.clientName
            state.item.clientPhone = payload.order_data.clientPhone
            state.item.departureAddress = payload.order_data.departureAddress
            state.item.departureFromDate = moment.unix(payload.order_data.departureFrom).format("YYYY-MM-DD")
            state.item.departureFromTime = moment.unix(payload.order_data.departureFrom).format("HH:mm")
            state.item.departureToDate = moment.unix(payload.order_data.departureTo).format("YYYY-MM-DD")
            state.item.departureToTime = moment.unix(payload.order_data.departureTo).format("HH:mm")

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

        SHOW_ORDER_DIALOG(state, payload) {
            state.dialog = true
        },

        HIDE_ORDER_DIALOG(state, payload) {
            state.dialog = false
        },
    },
}