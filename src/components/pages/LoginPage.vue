<template>
    <div class="d-flex justify-content-center align-items-center" style="height: 100vh;">
        <div class="card">
            <div class="card-body" style="width: 402px;">
                <form @submit.prevent="">
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
    import { reactive } from 'vue';

    const userData = reactive({
        email: '',
        password: ''
    })
</script>

<style scoped>
    
</style>
