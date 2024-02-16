<template>
    <div class="d-flex justify-content-center align-items-center" style="height: 100vh;">
        <div class="card">
            <div class="card-body auth-card">
                <form @submit.prevent="login()">
                    <h4 class="card-title mb-3" style="color: #404040;">Login to Vintage</h4>
                    <p class="tmb-4" style="color:#404040;">Enter your details below</p>
                    <div class="mb-3">
                        <basic-input @keyInput="emptyCheck(userData.email, 'email')" v-model="userData.email" type="text" :identity="'email'" placeholder="Enter your email" label="Email"></basic-input>
                        <p v-if="isEmpty['email']" class="text-danger fw-normal" style="font-size: 11px;">Enter password</p>
                    </div>
                    <div class="mb-5">
                        <basic-input @keyInput="emptyCheck(userData.password, 'password')" v-model="userData.password" :identity="'password'" :isPassword="true" placeholder="Enter your password" label="Password"></basic-input>
                        <p v-if="isEmpty['password']" class="text-danger fw-normal" style="font-size: 11px;">Enter password</p>
                    </div>
                    <button type="submit" class="btn btn-green-vintage w-100 mb-1">
                        Continue
                    </button>
                </form>
                <p class="text-center m-0" style="font-size: 14px;"><router-link class="text-decoration-none" to="/signup">signup</router-link> to create account</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    import BasicInput from '../ui/BasicInput.vue'
    import { useRouter } from 'vue-router';
    import { reactive } from 'vue';
    import { useStore } from 'vuex';

    const router = useRouter()
    const store = useStore()

    const userData = reactive({
        email: '',
        password: ''
    })
    const isEmpty = reactive({
        'email': false,
        'password': false
    })

    const emptyCheck = (data, isEmptyField) => {
        if (!data) {
            isEmpty[isEmptyField] = true
        } else {
            isEmpty[isEmptyField] = false
        }
    }

    const login = async () => {
        emptyCheck(userData.email, 'email')
        emptyCheck(userData.password, 'password')
        if (isEmpty['email'] !== true && isEmpty['password'] !== true) {
            await store.dispatch('auth/userLogin', userData)
            router.push('/')
        }
    }
</script>

<style scoped>
    
</style>
