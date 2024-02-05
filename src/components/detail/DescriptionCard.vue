<template>
    <div class="card">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <h3 class="m-0">{{ displayedPrice(productDetail.price) }}</h3>
                <i class="fa-regular fa-heart" style="font-size: 20px;"></i>
            </div>
            <p class="mb-1">{{ productDetail.name }}</p>
            <p class="text-muted">{{ productDetail.size }}<span class="mx-2">•</span>Very Good<span class="mx-2">•</span>Denpasar</p>
            <hr>
            <p class="text-muted mb-3">Item Description</p>
            <p>{{ productDetail.description }}</p>
            <div class="row row-cols-2">
                <div>
                    <p>Category</p>
                    <p>Size</p>
                    <p>Condition</p>
                    <p>Color</p>
                    <p>Uploaded</p>
                    <p>Shipping</p>
                </div>
                <div>
                    <p>{{ productDetail.category }}</p>
                    <p>{{ productDetail.size }}</p>
                    <p>Very Good</p>
                    <p>{{ productDetail.color }}</p>
                    <p>5 hours ago</p>
                    <p>{{ displayedPrice(productDetail.shipping) }}</p>
                </div>
            </div>
            <hr>
            <router-link class="btn btn-green-vintage text-decoration-none w-100 mb-3" to="#">Buy Now</router-link>
            <router-link class="btn btn-outline-green-vintage text-decoration-none w-100" to="#">Add to Cart</router-link>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        productDetail: Object
    })

    const displayedPrice = (price) => {return parseInt(price).toLocaleString('id-ID', { style: 'currency', currency: 'IDR',minimumFractionDigits: 0,maximumFractionDigits: 0 })}
</script>

<style>
    
</style>