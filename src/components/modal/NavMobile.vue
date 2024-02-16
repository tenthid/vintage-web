<template>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="p-3 d-flex justify-content-end">
            <button type="button" id="btnNavMobileClose" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <hr class="m-0">
        <div class="p-3">
            <div class="d-flex justify-content-between gap-4">
                <component :navMobile="true" v-if="loginLayout === false" :is="components[menuType]"></component>
                <div class="dropdown" style="padding-left: 12px;" :style="{'border-left': loginLayout? 'none' : '1px solid lightgrey'}">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="background-color: transparent; color: black; border: 0px;">
                        EN
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">EN</a></li>
                        <li><a class="dropdown-item" href="#">ID</a></li>
                    </ul>
                </div>
            </div>
            <div v-if="isLogin" class="d-flex mt-4 flex-column gap-3">
                <router-link to="/profile" class="btn btn-outline-green-vintage" style="font-size: 20px; border-radius: 15px;">
                    Profile details
                </router-link>
                <router-link to="/profile/change-password" class="btn btn-outline-green-vintage" style="font-size: 20px; border-radius: 15px;">
                    Change password
                </router-link>
                <router-link to="/profile/transaction-history" class="btn btn-outline-green-vintage" style="font-size: 20px; border-radius: 15px;">
                    Transaction history
                </router-link>
                <button @click="logout()" class="btn btn-outline-danger" style="font-size: 20px; border-radius: 10px;">
                    Logout
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import ProfileMenu from '../header/ProfileMenu.vue'
    import AuthMenu from '../header/AuthMenu.vue'
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';
    import { computed } from 'vue';

    const store = useStore()
    const router = useRouter()

    const props = defineProps({
        menuType: String,
        loginLayout: Boolean
    })

    const isLogin = computed(() => {
        return store.state.auth.isLogin
    })
    const components = {
        'profileMenu' : ProfileMenu,
        'authMenu' : AuthMenu
    }

    const logout = () => {
        store.commit('auth/setUserLogout')
        router.push('/')
    }
</script>

<style>
    
</style>