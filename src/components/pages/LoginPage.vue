<template>
    <div class="d-flex justify-content-center align-items-center" style="height: 100vh;">
        <div class="card">
            <div class="card-body auth-card">
                <form @submit.prevent="login()">
                    <h4 class="card-title mb-3" style="color: #404040;">Login to Vintage</h4>
                    <p class="tmb-4" style="color:#404040;">Enter your details below</p>
                    <basic-input v-model="userData.email" class="mb-3" type="text" :identity="'email'" placeholder="Enter your email" label="Email"></basic-input>
                    <basic-input v-model="userData.password" :identity="'password'" :isPassword="true" class="mb-5" placeholder="Enter your password" label="Password"></basic-input>
                    <button type="submit" class="btn btn-green-vintage w-100">
                        Continue
                    </button>
                </form>
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

    const login = async () => {
        await store.dispatch('auth/userLogin', userData)
        router.push('/')
    }
</script>

<style scoped>
    
</style>
