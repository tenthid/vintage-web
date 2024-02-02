<template>
    <div class="d-flex justify-content-center align-items-center page" style="height: 100vh;">
        <div class="card">
            <div class="card-body" style="width: 402px;">
                <form @submit.prevent="signUp()">
                    <h4 class="card-title mb-3" style="color: #404040;">Sign up</h4>
                    <p class="tmb-4" style="color:#404040;">Enter your details below</p>

                    <!-- full name -->
                    <basic-input v-model="userData.fullname" class="mb-3" type="text" :identity="'fullname'" placeholder="Enter your fullname" label="Full name"></basic-input>

                    <!-- username -->
                    <basic-input v-model="userData.username" class="mb-3" type="text" :identity="'username'" placeholder="Enter your fullname" label="Username"></basic-input>

                    <!-- email -->
                    <basic-input v-model="userData.email" class="mb-3" type="text" :identity="'email'" placeholder="Enter your email" label="Email"></basic-input>

                    <!-- password -->
                    <div class="mb-3">
                        <basic-input  v-model="userData.password" :identity="'password'" :isPassword="true" placeholder="Enter your password" label="Password"></basic-input>
                        <p v-if="passwordStatusDisplay === false" class="text-danger mt-1" style="font-size: 11px;">password length must be 8 character</p>
                    </div>

                    <!-- confirm password -->
                    <div class="mb-3">
                        <basic-input  v-model="confirmPass" :identity="'confimPassword'" :isPassword="true" placeholder="Enter your password" label="Confirmation Password"></basic-input>
                        <p v-if="passwordMatch === false" class="text-danger mt-1" style="font-size: 11px;">password isn't same</p>
                    </div>

                    <!-- user term agreement -->
                    <div class="form-check mb-5">
                        <input @click="userAgreementControl()" class="form-check-input checked-green-vintage" type="checkbox" value="" id="flexCheckDefault" style="cursor: pointer;">

                            <p class="m-0 mb-1">By clicking sign up, I hereby agree and consent to <a href="#" class="text-decoration-none" style="color: #009499;">Term & Conditions</a>; I confirm that I have read <a href="#" class="text-decoration-none" style="color: #009499;">Privacy policy</a>.</p>

                            <p v-if="userAgreementCheck" class="text-danger m-0" style="font-size: 11px;">must be checked to signup</p>
                    </div>

                    <button type="submit" class="btn btn-green-vintage w-100">
                        Sign up
                    </button>
                </form>
                <teleport to='body'>
                    <basic-modal :topPosition="modalPosition" :modalImg="'/images/register-success.gif'" v-if="modalShow"></basic-modal>
                </teleport>
            </div>
        </div>
    </div>
</template>

<script setup>
    import BasicInput from '../ui/BasicInput.vue'
    import BasicModal from '../modal/BasicModal.vue'
    import { ref, reactive, onUpdated } from 'vue';

    const userData = reactive({
        fullname: '',
        username: '',
        email: '',
        password: '',
    })

    const confirmPass = ref('')
    const userAgreement = ref(false)
    const userAgreementCheck = ref()
    const passwordStatusDisplay = ref()
    const passwordMatch = ref();
    const modalShow = ref(false)
    const modalPosition = ref()
    
    const passwordCheck = () => {
        if (userData.password === '') {
            passwordStatusDisplay.value = ''
        } else if (userData.password.length < 8) {
            passwordStatusDisplay.value = false;
        } else {
            passwordStatusDisplay.value = true;
        }
    }
    const confirmationPasswordCheck = () => {
        if (userData.password === '') {
            passwordMatch.value = ''
        } else if (confirmPass.value === userData.password) {
            passwordMatch.value = true
        } else {
            passwordMatch.value = false
        }
    };

    const userAgreementControl = () => {
        userAgreement.value = !userAgreement.value
        userAgreementCheck.value = false
    }

    const signUp = () => {
        if (userAgreement.value) {
            if (userData.fullname !== '' && userData.username !== '' && userData.email !== '' && userData.password !== '' && passwordMatch.value !== false && passwordStatusDisplay.value !== false) {
                modalShow.value = !modalShow.value
                modalPosition.value = window.scrollY
                document.documentElement.style.overflow = 'hidden';
            } else {
                window.alert('please fill all form')
            }
        } else {
            userAgreementCheck.value = true
        }
    }

    onUpdated(() => {
        passwordCheck()
        confirmationPasswordCheck()
    })
</script>

<style scoped>
    
</style>
