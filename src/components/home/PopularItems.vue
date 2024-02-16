<template>
    <div class="mb-5">
        <div class="d-flex justify-content-between align-items-end">
            <h2 class="text-center text-sm-start m-0">Popular Items</h2>
            <router-link to="/product" class="m-0 color-green-vintage text-decoration-none" style="font-family: Inter; font-size: 16px;">See all</router-link>
        </div>
        <items-list :products="popularItems">
            <router-link to="/product" class="d-flex justify-content-center align-items-center text-decoration-none text-dark" style="background-color: #EBFEFF;">
                <h5 style="color: #009499;" class="my-4">See All<br>Product</h5>
            </router-link>
        </items-list>
    </div>
</template>

<script setup>
    import ItemsList from './ItemsList.vue'
    import { useStore } from 'vuex';
    import { onMounted, ref, onUnmounted } from 'vue';

    const store = useStore()

    const products = store.state.product.products
    const popularItems =  products.slice().sort(function(a, b) { return b.totalRate - a.totalRate; }).slice(0, 5)
</script>

<style>
    
</style>