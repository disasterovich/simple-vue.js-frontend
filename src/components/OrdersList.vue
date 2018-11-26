<template>
    <div>

        <div v-if="orders.length > 0">
            <v-simple-table>
                <thead>
                <tr>
                    <th class="text-left">
                        <a href="#" @click.prevent="setSort('id')">ID<v-icon>{{getSortIcon('id')}}</v-icon></a>
                    </th>
                    <th class="text-left">Время создания</th>
                    <th class="text-left">
                        <a href="#" @click.prevent="setSort('client_name')">Имя<v-icon>{{getSortIcon('client_name')}}</v-icon></a>
                    </th>
                    <th class="text-left">Телефон</th>
                    <th class="text-left">Адрес</th>
                    <th class="text-left">С</th>
                    <th class="text-left">По</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="order in orders" :key="order.id">
                    <td>{{ order.id }}</td>
                    <td>{{ timestampToDate(order.created_at) }}</td>
                    <td>{{ order.client_name }}</td>
                    <td>{{ order.client_phone }}</td>
                    <td>{{ order.departure_address }}</td>
                    <td>{{ timestampToDate(order.departure_from) }}</td>
                    <td>{{ timestampToDate(order.departure_to) }}</td>
                </tr>
                </tbody>
            </v-simple-table>

            <v-row>
                <v-col cols="12">
                    <v-pagination
                        :length="pagination['page-count']"
                        :total-visible="5"
                        :value="pagination['current-page']"
                        @input="getOrders"
                    ></v-pagination>
                </v-col>
            </v-row>
        </div>
        <div v-else>Нет заказов</div>

    </div>
</template>

<script>
    import moment from 'moment'
    import { mapState, mapGetters } from 'vuex';

    export default {
        name: "OrdersList",
        components: {

        },
        computed: {
            ...mapState({
                orders: state => state.orders.items,
                pages: state => state.orders.pages,
                pagination: state => state.orders.pagination,
                sort: state => state.orders.sort,
            }),

            ...mapGetters({
                ordersSortString: 'ordersSortString',
            })
        },

        created() {
            //выводим список заказов
            this.getOrders(1)
        },

        methods: {

            timestampToDate(timestamp, format="YYYY-MM-DD HH:mm") {
                return moment.unix(timestamp).format(format)
            },

            setSort(field_name) {
                this.$store.commit({type: 'SET_ORDERS_SORT',value: field_name})
                this.$store.dispatch({'type': 'loadOrders'}) //TODO загружать тек. страницу
            },

            getSortIcon(field_name) {
                if ( this.sort[field_name] == 'asc' ) {
                    return 'mdi-chevron-down'
                }
                else if ( this.sort[field_name] == 'desc' ) {
                    return 'mdi-chevron-up'
                }
                return ''
            },

            getOrders(page) {
                this.$store.dispatch({'type': 'loadOrders','page': page})
            },

            loadOrder(id) {
                this.$store.commit({type: 'SET_ORDERf_LOADING_STATE', value: true})
                this.$store.dispatch({'type': 'loadOrder', 'id': id})
            },

            deleteOrder(id) {
                if (confirm('Вы уверены что хотите удалить?')) {
                    this.$store.dispatch({'type': 'deleteOrder', 'id': id})
                }
            },
        }
    }
</script>

<style scoped>

</style>