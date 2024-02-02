<template>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="p-3 d-flex justify-content-end">
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
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
        </div>
    </div>
</template>

<script setup>
    import ProfileMenu from '../header/ProfileMenu.vue'
    import AuthMenu from '../header/AuthMenu.vue'

    const props = defineProps({
        menuType: String,
        loginLayout: Boolean
    })

    const components = {
        'profileMenu' : ProfileMenu,
        'authMenu' : AuthMenu
    }
</script>

<style>
    
</style>