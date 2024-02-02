<template>
    <div class="row row-cols-2 row-cols-sm-3 row-cols-lg-4 row-gap-5">
        <div v-for="(item, key) in footerList" :key="key" class="gap-3 d-flex flex-column">
            <p class="text-light m-0 footer-menu-header">{{ key }}</p>
            <router-link v-for="(subItem, subKey) in item" :key="subKey" :to="subItem" tag="button" class="footer-menu-item">{{ subKey }}</router-link>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        footerList: Object
    })

    
</script>

<style scoped>
    .footer-menu-header {
        font-family: Inter;
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: 26px; /* 144.444% */
    }

    .footer-menu-item {
        font-family: Inter;
        font-size: 16px;
        text-decoration: none;
        font-style: normal;
        font-weight: lighter;
        color: lightgray;
        line-height: 24px;
    }
</style>