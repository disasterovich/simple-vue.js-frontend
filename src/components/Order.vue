<template>
    <div>
        <v-btn color="primary" @click.stop="addOrder()">Добавить заказ</v-btn>

        <v-dialog v-model="dialog" max-width="600">
            <v-card>
                <v-card-title class="headline">
                    {{order.id ? 'Редактирование заказа с ID=' + order.id : 'Создать заказ'}}
                </v-card-title>

                <v-card-text>

                    <v-text-field
                        :value="order.clientName"
                        @input="value => updateOrderField('clientName',value)"
                        label="Имя клиента*"
                        required
                        :error-messages="errors.clientName"
                    ></v-text-field>

                    <v-text-field
                        :value="order.clientPhone"
                        @input="value => updateOrderField('clientPhone',value)"
                        type="tel"
                        label="Телефон клиента*"
                        required
                        :error-messages="errors.clientPhone"
                    ></v-text-field>

                    <v-text-field
                        :value="order.departureAddress"
                        @input="value => updateOrderField('departureAddress',value)"
                        label="Адрес выезда*"
                        required
                        :error-messages="errors.departureAddress"
                    ></v-text-field>

                    <v-menu
                        v-model="menuDepartureFromDate"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                label="Дата выезда c*"
                                readonly
                                v-on="on"
                                :value="order.departureFromDate"
                                :error-messages="errors.departureFromDate"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            @input="value => updateOrderField('departureFromDate',value)"
                            :value="order.departureFromDate"
                        >
                        </v-date-picker>
                    </v-menu>

                    <v-text-field
                        label="Время выезда c*"
                        type="time"
                        :value="order.departureFromTime"
                        @input="value => updateOrderField('departureFromTime',value)"
                        :error-messages="errors.departureFromTime"
                    ></v-text-field>


                    <v-menu
                        v-model="menuDepartureToDate"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                label="Дата выезда до*"
                                readonly
                                v-on="on"
                                :value="order.departureToDate"
                                :error-messages="errors.departureToDate"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            @input="value => updateOrderField('departureToDate',value)"
                            :value="order.departureToDate"
                        >
                        </v-date-picker>
                    </v-menu>

                    <v-text-field
                        label="Время выезда до*"
                        type="time"
                        :value="order.departureToTime"
                        @input="value => updateOrderField('departureToTime',value)"
                        :error-messages="errors.departureToTime"
                    ></v-text-field>

                    <small>*indicates required field</small>

                </v-card-text>

                <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="blue darken-1" text @click="dialog = false">Закрыть</v-btn>
                    <v-btn color="blue darken-1" text @click="saveOrder">{{order.id ? 'Обновить' : 'Сохранить'}}</v-btn>
                </v-card-actions>

            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import moment from 'moment'

    export default {
        name: "Order",

        data() {
            return {
                menuDepartureFromDate: '',
                menuDepartureToDate: '',

                currentDate: moment(new Date()).format('YYYY-MM-DD'),

                dialog: false,
            }
        },

        components: {
        },

        computed: {
            ...mapState({
                order: state => state.order.item,
                loading: state => state.order.loading,
                errors: state => state.order.errors,
            }),
        },

        mounted() {

            //Обработчик вызывается после каждой мутации и получает в качестве параметров дескриптор мутации и состояние после мутации
            this.$store.subscribe((mutation, state) => {

                switch (mutation.type) {

                    case 'SAVE_ORDER':

                        //после сохранения закрываем окно
                        if (this.errors.length == 0) {
                            this.dialog = false
                        }
                        break;
                }
            })
        },

        methods: {

            updateOrderField(key,value) {

                //закрываем меню выбора даты
                if (key === 'departureFromDate') {
                    this.menuDepartureFromDate = false
                }
                //закрываем меню выбора даты
                else if (key === 'departureToDate') {
                    this.menuDepartureToDate = false
                }

                this.$store.commit('UPDATE_ORDER_FIELD', { key: key, value: value })
            },
            saveOrder() {
                this.$store.dispatch({'type': 'saveOrder'})
            },
            addOrder() {
                this.dialog = true
                this.$store.commit('ADD_ORDER')
            },
        }
    }
</script>

<style scoped>

</style>