<template>
    <header>
        <!-- ini header -->
        <nav-bar :loginLayout="loginLayout"></nav-bar>
    </header>
</template>

<script setup>
    import NavBar from './NavBar.vue';

    defineProps({
    loginLayout: Boolean
})
</script>

<style>
    
</style>