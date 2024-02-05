<template>
    <div :class="classType[props.listType]">
        <router-link :to="`/detail/${product.id}`" v-for="product in products" class="item-card d-flex flex-column gap-2 text-decoration-none text-dark">
            <img class="img-fluid" :src="product.image" alt="product image">
            <h3 class="color-green-vintage m-0">{{ displayedPrice(product.price) }}</h3>
            <p class="m-0">{{ product.name }}</p>
            <div class="d-flex justify-content-between align-items-center">
                <p class="m-0">{{ product.size }}</p>
                <i class="fa-regular fa-heart"></i>
            </div>
        </router-link>
        <slot></slot>
    </div>
</template>

<script setup>
    import { computed, reactive } from 'vue';

    const props = defineProps({
        products: Object,
        listType: {type: String, default: 'default'}
    })

    const classType = reactive({
        'default' : 'mt-4 row row-cols-1 row-cols-sm-3 row-cols-lg-6 row-gap-4',
        'other' : 'mt-4 row row-cols-1 row-cols-sm-2 row-cols-lg-4 row-gap-4'
    })
    
    const products = computed(() => {
        return props.products
    })

    const displayedPrice = (price) => {return parseInt(price).toLocaleString('id-ID', { style: 'currency', currency: 'IDR',minimumFractionDigits: 0,maximumFractionDigits: 0 })}

</script>

<style>
    
</style>