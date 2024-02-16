<template>
    <div class="card">
        <div class="card-body">
            <p class="text-muted mb-4">
                Change Password
            </p>
            <form @submit.prevent="changePass()">
                <div class="mb-3">
                    <basic-input v-model="modifyPassword.oldPassword" @keyInput="checkIsEmpty(modifyPassword.oldPassword, 'oldPassword')" :isPassword="true" type="password" placeholder="Old password" identity="oldPassword" label="Old Password" :withSpan="false"></basic-input>
                    <p v-if="isEmpty['oldPassword']" style="font-size: 11px;" class="text-danger fw-normal">Enter old password</p>
                </div>
                <div class="mb-3">
                    <basic-input v-model="modifyPassword.newPassword" @keyInput="checkIsEmpty(modifyPassword.newPassword, 'newPassword')" :isPassword="true" type="password" placeholder="New password" identity="newPassword" label="New Password" :withSpan="false"></basic-input>
                    <p v-if="isEmpty['newPassword']" style="font-size: 11px;" class="text-danger fw-normal">Enter new password</p>
                </div>
                <div class="mb-3">
                    <basic-input v-model="confrimPass" :isPassword="true" type="password" placeholder="Confirmation password" identity="confirmationPassword" label="Confirmation New Password" :withSpan="false"></basic-input>
                    <p v-if="confirmPassDisplay" style="font-size: 11px;" class="text-danger fw-normal">Password isn't same</p>
                </div>
                <div class="d-flex justify-content-end">
                    <button type="submit" class="btn btn-green-vintage">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
    import BasicInput from '../ui/BasicInput.vue';
    import { reactive, ref, onUpdated } from 'vue';
    import { useStore } from 'vuex';

    const store = useStore()

    const props = defineProps({
        userData: Object
    })

    const confrimPass = ref('')
    const confirmPassDisplay = ref(false)
    const modifyPassword = reactive({
        oldPassword: '',
        newPassword: ''
    })
    const isEmpty = reactive({
        'oldPassword': false,
        'newPassword': false
    })

    const checkIsEmpty = async (data, emptyField) => {
        if (!data) {
            isEmpty[emptyField] = true
        } else {
            isEmpty[emptyField] = false
        }
    }

    const checkConfirmationPass = () => {
        if (confrimPass.value === modifyPassword.newPassword) {
            confirmPassDisplay.value = false
        } else {
            confirmPassDisplay.value = true
        }
    }
    
    const changePass = async () => {
        checkIsEmpty(modifyPassword.oldPassword, 'oldPassword')
        checkIsEmpty(modifyPassword.newPassword, 'newPassword')
        if (isEmpty['oldPassword'] === false && isEmpty['newPassword'] === false && confirmPassDisplay.value === false) {
            await store.dispatch('auth/changeUserPassword', modifyPassword)
            console.log('reset password jalan')
            modifyPassword.oldPassword = ''
            modifyPassword.newPassword = ''
            confrimPass.value = ''
        }
    }

    onUpdated(async () => {
        checkConfirmationPass()
    })
</script>

<style>
    
</style>