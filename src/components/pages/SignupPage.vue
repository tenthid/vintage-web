<template>
    <div class="d-flex justify-content-center page-height" style="height: 100vh;">
        <div class="card my-auto" style="height: fit-content;">
            <div class="card-body" style="width: 402px;">
                <form @submit.prevent="signUp()">
                    <h4 class="card-title mb-3" style="color: #404040;">Sign up</h4>
                    <p class="tmb-4" style="color:#404040;">Enter your details below</p>

                    <!-- full name -->
                    <div class="mb-3">
                        <basic-input @keyInput="checkFullName()" v-model="userData.fullname" type="text" :identity="'fullname'" placeholder="Enter your fullname" label="Full name"></basic-input>
                        <p v-if="isFullNameEmpty" class="text-danger mt-1" style="font-size: 11px;">Enter your fullname</p>
                    </div>

                    <!-- username -->
                    <div class="mb-3">
                        <basic-input @keyInput="checkUserName" v-model="userData.username" type="text" :identity="'username'" placeholder="Enter your fullname" label="Username"></basic-input>
                        <p v-if="isUserNameEmpty" class="text-danger mt-1" style="font-size: 11px;">Enter your username</p>
                    </div>

                    <!-- email -->
                    <div class="mb-3">
                        <basic-input @keyInput="checkEmail" v-model="userData.email" type="text" :identity="'email'" placeholder="Enter your email" label="Email"></basic-input>
                        <p v-if="isEmailEmpty" class="text-danger mt-1" style="font-size: 11px;">Enter your email</p>
                    </div>

                    <!-- password -->
                    <div class="mb-3">
                        <basic-input @keyInput="passwordEmptyCheck()" v-model="userData.password" :identity="'password'" :isPassword="true" placeholder="Enter your password" label="Password"></basic-input>
                        <p v-if="isPasswordEmpty" class="text-danger mt-1" style="font-size: 11px;">Enter your password</p>
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

                            <p v-if="isUserAgree" class="text-danger m-0" style="font-size: 11px;">must be checked to signup</p>
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
    const isUserAgree = ref()
    const passwordStatusDisplay = ref()
    const passwordMatch = ref();
    const modalShow = ref(false)
    const modalPosition = ref()
    const isFullNameEmpty = ref(false)
    const isUserNameEmpty = ref(false)
    const isEmailEmpty = ref(false)
    const isPasswordEmpty = ref(false)
    
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
        isUserAgree.value = false
    }

    const checkFullName = () => {
        // check is fullname empty
        if (!userData.fullname) {
            isFullNameEmpty.value = true
        } else {
            isFullNameEmpty.value = false
        }
    }
    
    const checkUserName = () => {
        // check is username empty
        if (!userData.username) {
            isUserNameEmpty.value = true
        } else {
            isUserNameEmpty.value = false
        }
    }
 
    const checkEmail = () => {
        // check email empty
        if (!userData.email) {
            isEmailEmpty.value = true
        }  else {
            isEmailEmpty.value = false
        }
    }

    const passwordEmptyCheck = () => {
        if (!userData.password) {
            isPasswordEmpty.value = true
        } else {
            isPasswordEmpty.value = false
        }
    }
 
    const checkUserAgree = () => {
        // check user agreement
        if (userAgreement.value === false) {
            isUserAgree.value = true
        }
    }
 
    const signUp = () => {
        // check all requirement to signup
        checkFullName()
        checkUserName()
        checkEmail()
        passwordEmptyCheck()
        checkUserAgree()
        if (isFullNameEmpty.value === false && isUserNameEmpty.value === false && isEmailEmpty.value  === false && isPasswordEmpty.value === false && passwordMatch.value && passwordStatusDisplay.value && userAgreement.value) {
            modalShow.value = !modalShow.value
            modalPosition.value = window.scrollY
            document.documentElement.style.overflow = 'hidden';
        }
    }

    onUpdated(() => {
        passwordCheck()
        confirmationPasswordCheck()
        // checkAllRequire()
    })
</script>

<style scoped>
    
</style>
