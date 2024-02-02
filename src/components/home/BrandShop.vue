<template lang="">
    <div class="mb-5">
        <h3>Shop by brand</h3>
        <div class="row row-cols-auto row-gap-2 column-gap-3 ms-0">
            <router-link v-for="brand in brands" to="#" class="px-3 py-1 text-dark text-decoration-none border rounded" style="font-size: 17px">
                {{ brand }}
            </router-link>
        </div>
    </div>
</template>
<script setup>
    const brands = [
        'Vans', 
        'Bohoo', 
        'Mango', 
        'Rebook', 
        'Converse', 
        'Sandro', 
        'Nike', 
        'Adidas', 
        'Dior', 
        'Puma',
        'American eagle' 
    ]
</script>
<style lang="">
    
</style>