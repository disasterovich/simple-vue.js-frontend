<template>
    <div>
        <v-form @submit.prevent="register">

            <v-text-field
                    v-model="name"
                    label="Имя"
                    required
                    :error-messages="errors.name"
            ></v-text-field>

            <v-text-field
                    v-model="email"
                    label="E-mail"
                    required
                    :error-messages="errors.email"
            ></v-text-field>

            <v-text-field
                    v-model="password"
                    label="Пароль"
                    type="password"
                    required
                    :error-messages="errors.password"
            ></v-text-field>

            <v-text-field
                    v-model="password2"
                    label="Пароль еще раз"
                    type="password"
                    required
                    :error-messages="errors.password2"
            ></v-text-field>

            <v-btn type="submit" color="primary">{{$t('register')}}</v-btn>

        </v-form>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        name: "RegisterForm",

        data() {
            return {
                name: 'Николай',
                email: 'disasterovich@mail.ru', //null,
                password: 'zstebgtu', //null,
                password2: 'zstebgtu', //null,

                //TODO добавить каптчу
            }
        },

        computed: {
            ...mapState({
                errors: state => state.user.errors,
                user: state => state.user.item,
            }),
        },

        methods: {
            register() {

                //TODO валидация вводимых данных на клиенте

                this.$store.dispatch({'type': 'registerUser',
                    'name': this.name,
                    'email': this.email,
                    'password': this.password,
                    'password2': this.password2,
                })
            }
        }

    }
</script>

<style scoped>

</style>