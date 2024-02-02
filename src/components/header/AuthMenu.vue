<template>
    <div v-if="navMobile" class="container-auth-menu w-100">
        <router-link to="/login" class="btn btn-outline-green-vintage text-nowrap w-100 text-decoration-none">
            Login
        </router-link>
        <router-link to="/signup" class="btn btn-green-vintage text-nowrap w-100 text-decoration-none">
            Sign up
        </router-link>
    </div>
    <div v-else class="container-auth-menu">
        <router-link to="/login" class="btn btn-outline-green-vintage text-nowrap text-decoration-none">
            Login
        </router-link >
        <router-link to="/signup" class="btn btn-green-vintage text-nowrap text-decoration-none">
            Sign up
        </router-link>
    </div>
</template>

<script setup>
    defineProps({
        navMobile: Boolean
    })
</script>

<style scoped>
    .container-auth-menu {
        display: flex;
        gap: 16px;
    }
</style>