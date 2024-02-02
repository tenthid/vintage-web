<template>
    <nav class="justify-content-between justify-content-lg-none z-3" :style="{'justify-content': loginLayout? 'space-between' : 'none'}">
        <router-link to="/" class="logo text-decoration-none">
            <img src="../../assets/images/logo.svg" alt="logo">
            <p class="logo-typography">Vintage</p>
        </router-link>
        <nav-search v-if="loginLayout === false" ></nav-search>
        <component :navMobile="false" class="d-none d-lg-flex" v-if="loginLayout === false" :is="components[menuType]"></component>
        <div class="dropdown d-none d-lg-block" style="padding-left: 12px;" :style="{'border-left': loginLayout? 'none' : '1px solid lightgrey'}">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="background-color: transparent; color: black; border: 0px;">
                EN
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">EN</a></li>
                <li><a class="dropdown-item" href="#">ID</a></li>
            </ul>
        </div>
        <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <i style="font-size: 25px;" class="fa-solid fa-bars"></i>
        </button>
        <nav-mobile :loginLayout="loginLayout" :menuType="menuType"></nav-mobile>
    </nav>
</template>

<script setup>
import ProfileMenu from './ProfileMenu.vue'
import NavSearch from './NavSearch.vue';
import AuthMenu from './AuthMenu.vue';
import NavMobile from '../modal/NavMobile.vue'
import { ref } from 'vue';

defineProps({
    loginLayout: Boolean
})

const menuType = ref('authMenu')

const components = {
    'authMenu' : AuthMenu,
    'profileMenu' : ProfileMenu
}
</script>

<style scoped>
    .logo {
        display: flex;
        gap: 12px;
    }
</style>