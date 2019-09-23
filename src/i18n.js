import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default new VueI18n({
    locale: 'en',
    fallbackLocale: 'ru',
    //TODO import translation from json files
    messages: {
        en: {
            testAdmin: 'Test admin',
            orders: 'Orders',
            createOrder: 'Create order',
            editOrderWithId: 'Edit order with ID=',
            close: 'Close',
            login: 'Login',
            register: 'Register',
            logout: 'Logout',
            profile: 'Profile',
            save: 'Save',
            update: 'Update',
            clientName: 'Client name',
            clientPhone: 'Client phone',
            departureAddress: 'Departure address',
            departureFromDate: 'Departure Date From',
            departureFromTime: 'Departure Time From',
            departureToDate: 'Departure Date To',
            departureToTime: 'Departure Time To',

            creationTime: 'Creation time',
            name: 'Name',
            phone: 'Phone',
            address: 'Address',
            from: 'From',
            to: 'To',
            noOrders: 'No orders',

            searchByClientName: 'Search by client name',
            actions: 'Actions',
            areYouSureWantDelete: 'Are you sure you want to delete?',
            indicatesRequiredField: 'indicates required field',

        },
        ru: {
            testAdmin: 'Тестовая админка',
            orders: 'Заказы',
            createOrder: 'Создать заказ',
            editOrderWithId: 'Редактирование заказа с ID=',
            close: 'Закрыть',
            login: 'Войти',
            register: 'Зарегистрироваться',
            logout: 'Выход',
            profile: 'Профиль',
            save: 'Сохранить',
            update: 'Обновить',
            clientName: 'Имя клиента',
            clientPhone: 'Телефон клиента',
            departureAddress: 'Адрес выезда',
            departureFromDate: 'Дата выезда с',
            departureFromTime: 'Время выезда с',
            departureToDate: 'Дата выезда до',
            departureToTime: 'Время выезда до',

            creationTime: 'Время создания',
            name: 'Имя',
            phone: 'Телефон',
            address: 'Адрес',
            from: 'С',
            to: 'По',
            noOrders: 'Нет заказов',

            searchByClientName: 'Поиск по имени клиента',
            actions: 'Действия',
            areYouSureWantDelete: 'Вы уверены что хотите удалить?',
            indicatesRequiredField: 'обязательные поля',
        },
    }
})