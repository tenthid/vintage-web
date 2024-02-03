<template lang="">
    <div class="mb-5">
        <h3>Shop by brand</h3>
        <div class="row row-cols-auto row-gap-2 column-gap-3 ms-0">
            <router-link v-for="brand in brands" :to="'/product?brand=' + transformFirstChar(brand)" class="px-3 py-1 text-dark text-decoration-none border rounded" style="font-size: 17px">
                {{ transformFirstChar(brand) }}
            </router-link>
        </div>
    </div>
</template>
<script setup>
    import { useStore } from 'vuex';

    const store = useStore()

    const products = store.state.product.products
    const brands = [...new Set(products.map(product => product.brand))];
    // const brands = [
    //     'Vans', 
    //     'Bohoo', 
    //     'Mango', 
    //     'Rebook', 
    //     'Converse', 
    //     'Sandro', 
    //     'Nike', 
    //     'Adidas', 
    //     'Dior', 
    //     'Puma',
    //     'American eagle' 
    // ]

    const transformFirstChar = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }
</script>
<style lang="">
    
</style>