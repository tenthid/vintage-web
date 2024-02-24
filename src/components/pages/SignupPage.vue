<template>
    <div class="d-flex justify-content-center page-height" style="height: 100vh;">
        <div class="card my-auto auth-card" style="height: fit-content;">
            <div class="card-body">
                <form @submit.prevent="signUp()">
                    <h4 class="card-title mb-3" style="color: #404040;">Sign up</h4>
                    <p class="tmb-4" style="color:#404040;">Enter your details below</p>

                    <!-- full name -->
                    <div class="mb-3">
                        <basic-input @keyInput="checkIsEmpty(userData.fullname, 'fullname')" v-model="userData.fullname" type="text" :identity="'fullname'" placeholder="Enter your fullname" label="Full name"></basic-input>
                        <p v-if="requirement['fullname']" class="text-danger mt-1" style="font-size: 11px;">Enter your fullname</p>
                    </div>

                    <!-- username -->
                    <div class="mb-3">
                        <basic-input @keyInput="checkIsEmpty(userData.username, 'username')" v-model="userData.username" type="text" :identity="'username'" placeholder="Enter your fullname" label="Username"></basic-input>
                        <p v-if="requirement['username']" class="text-danger mt-1" style="font-size: 11px;">Enter your username</p>
                    </div>

                    <!-- email -->
                    <div class="mb-3">
                        <basic-input @keyInput="() => {checkIsEmpty(userData.email, 'email'); isEmailCheck()}" v-model="userData.email" type="text" :identity="'email'" placeholder="Enter your email" label="Email"></basic-input>
                        <p v-if="requirement['email']" class="text-danger mt-1 mb-0" style="font-size: 11px;">Enter your email</p>
                        <p v-if="!isEmailFormat && !requirement['email']" class="text-danger mt-1" style="font-size: 11px;">Please enter a valid email</p>
                    </div>

                    <!-- password -->
                    <div class="mb-3">
                        <basic-input @keyInput="checkIsEmpty(userData.password, 'password')" v-model="userData.password" :identity="'password'" :isPassword="true" placeholder="Enter your password" label="Password"></basic-input>
                        <p v-if="requirement['password']" class="text-danger mt-1" style="font-size: 11px;">Enter your password</p>
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

                            <p v-if="requirement['userAgree']" class="text-danger m-0" style="font-size: 11px;">must be checked to signup</p>
                    </div>

                    <button type="submit" class="btn btn-green-vintage w-100 mb-1">
                        Sign up
                    </button>
                </form>
                <p class="text-center m-0" style="font-size: 14px;">have an account? <router-link class="text-decoration-none" to="/login">login</router-link></p>
                <teleport to='body'>
                    <basic-modal :topPosition="modalPosition" :modalImg="'/images/register-success.gif'" :modalTitle="'Successfuly Register'" :modalDesc="'Thank you for register at vintage. Start find your favorite pre-loved product here.'" :modalLink="'/'" :modalLinkText="'Go to Home Page'" v-if="modalShow"></basic-modal>
                </teleport>
            </div>
        </div>
    </div>
    <teleport to='body'>
        <div class="bg-danger w-100 p-1" style="position: fixed; z-index: 1; transition: top 0.4s ease-in-out;" :style="{'top' : topPosition + 'px'}">
            <p class="m-0 text-light text-center" style="font-size: 14px;">Email is already registered</p>
        </div>
    </teleport>
</template>

<script setup>
    import BasicInput from '../ui/BasicInput.vue'
    import BasicModal from '../modal/BasicModal.vue'
    import { ref, reactive, onUpdated } from 'vue';
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';

    const store = useStore()
    const router = useRouter()

    const userData = reactive({
        fullname: '',
        username: '',
        email: '',
        password: '',
        image: 'images/user.png',
    })

    const confirmPass = ref('')
    const passwordStatusDisplay = ref()
    const passwordMatch = ref();
    const modalPosition = ref()
    const userAgreement = ref(false)
    const modalShow = ref(false)
    const isError = ref()
    const isEmailFormat = ref(true)

    const requirement = reactive({
        'fullname' : false,
        'username' : false,
        'email' : false,
        'password' : false,
        'userAgree' : false
    })
    const topPosition = ref(0)
    const notifTimeOut = ref()
    // const isUserAgree = ref(false)
    // const isFullNameEmpty = ref(false)
    // const isUserNameEmpty = ref(false)
    // const isEmailEmpty = ref(false)
    // const isPasswordEmpty = ref(false)
    
    const checkIsEmpty = (dataCheck, isEmpty) => {
        if (!dataCheck) {
            requirement[isEmpty] = true;
        } else {
            requirement[isEmpty] = false;
        }
    }

    const isEmailCheck = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(userData.email)) {
            isEmailFormat.value = true
        } else {
            isEmailFormat.value = false
        }
    }

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
        requirement['userAgree'] = false
    }

    // const checkFullName = () => {
    //     // check is fullname empty
    //     if (!userData.fullname) {
    //         isFullNameEmpty.value = true
    //     } else {
    //         isFullNameEmpty.value = false
    //     }
    // }
    
    // const checkUserName = () => {
    //     // check is username empty
    //     if (!userData.username) {
    //         isUserNameEmpty.value = true
    //     } else {
    //         isUserNameEmpty.value = false
    //     }
    // }
 
    // const checkEmail = () => {
    //     // check email empty
    //     if (!userData.email) {
    //         isEmailEmpty.value = true
    //     }  else {
    //         isEmailEmpty.value = false
    //     }
    // }

    // const passwordEmptyCheck = () => {
    //     if (!userData.password) {
    //         isPasswordEmpty.value = true
    //     } else {
    //         isPasswordEmpty.value = false
    //     }
    // }
 
    // const checkUserAgree = () => {
    //     // check user agreement
    //     if (!userAgreement.value) {
    //         isUserAgree.value = true
    //     }
    // }
 
    const signUp = async () => {
        // check all requirement to signup
        // checkFullName()
        // checkUserName()
        // checkEmail()
        // passwordEmptyCheck()
        // checkUserAgree()
        checkIsEmpty(userData.fullname, 'fullname')
        checkIsEmpty(userData.username, 'username')
        checkIsEmpty(userData.email, 'email')
        checkIsEmpty(userData.password, 'password')
        checkIsEmpty(userAgreement.value, 'userAgree')
        isEmailCheck()
        if (requirement['fullname'] === false && requirement['username'] === false && requirement['email']  === false && requirement['password'] === false && passwordMatch.value && passwordStatusDisplay.value && userAgreement.value && isEmailFormat.value) {
            isError.value = await store.dispatch('auth/userRegister', userData)
            if(isError.value) {
                clearTimeout(notifTimeOut.value)
                topPosition.value = 62
                notifTimeOut.value = setTimeout(() => {
                    topPosition.value = 0
                }, 3000)
            } else {
                modalShow.value = !modalShow.value
                modalPosition.value = window.scrollY
                document.documentElement.style.overflow = 'hidden';
            }
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
