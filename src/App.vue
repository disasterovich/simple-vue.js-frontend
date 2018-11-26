<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app clipped>
            <v-list dense>
                <v-list-item to="/orders">
                    <v-list-item-action>
                        <v-icon>mdi-view-dashboard</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Заказы</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app clipped-left>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Тестовая админка</v-toolbar-title>

            <div class="flex-grow-1"></div>

            <v-menu left bottom>
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                        <v-icon>mdi-account</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item v-if="user.isAuth" to="/profile">
                        <v-list-item-title>Профиль</v-list-item-title>
                    </v-list-item>

                    <v-list-item v-if="user.isAuth" @click="logout()">
                        <v-list-item-title>Выйти</v-list-item-title>
                    </v-list-item>

                    <v-list-item v-if="!user.isAuth" to="/login">
                        <v-list-item-title>Вход</v-list-item-title>
                    </v-list-item>

                    <v-list-item v-if="!user.isAuth" to="/register">
                        <v-list-item-title>Регистрация</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

        </v-app-bar>

        <v-content>
            <v-container fluid>
                <router-view/>
            </v-container>
        </v-content>

        <v-footer app>
            <span>&copy; 2019</span>
        </v-footer>
    </v-app>
</template>

<script>
    import { mapState } from 'vuex';

    export default {

        computed: {
            ...mapState({
                user: state => state.user,
            }),
        },

        methods: {
            logout() {
                this.$store.commit({type: 'LOGOUT_USER'})
            }
        },

        props: {
            source: String,
        },
        data: () => ({
            drawer: null,
        }),

    }
</script>

<style>

</style>