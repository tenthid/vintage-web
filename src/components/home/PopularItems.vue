<template>
    <div class="mb-5">
        <h2 class="text-center text-sm-start">Popular items</h2>
        <items-list :products="products">
            <router-link to="#" class="d-flex justify-content-center align-items-center text-decoration-none text-dark" style="background-color: #EBFEFF;">
                <h5 style="color: #009499;" class="my-4">See All<br>Product</h5>
            </router-link>
        </items-list>
    </div>
</template>

<script setup>
    import ItemsList from './ItemsList.vue'
    import { useStore } from 'vuex';

    const store = useStore()

    const products = store.state.product.products
</script>

<style>
    
</style>