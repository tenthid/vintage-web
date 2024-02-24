<template>
    <div class="page">
        <div class="container-md pt-4 pb-5 mb-5" v-if="detailStatus">
            <div class="row">
                <div class="col-12 col-lg-8">
                    <img :src="productDetail.image" alt="product image" width="100%" height="auto" class="mb-5">
                    <div class="d-none d-lg-block">
                        <h4 class="mb-1">Other Product</h4>
                        <items-list :listType="'other'" :products="products" ></items-list>
                    </div>
                </div>
                <div class="col-12 col-lg-4">
                    <description-card :userData="userData" :productDetail="productDetail"></description-card>
                    <div class="d-block d-lg-none">
                        <h4 class="mb-1 mt-5">Other Product</h4>
                        <items-list :listType="'other'" :products="products" ></items-list>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="d-flex justify-content-center align-items-center" style="height: 92vh;">
            <div v-if="isProductNull" class="d-flex justify-content-center align-items-center flex-column" style="height: 86vh;">
                <img src="/images/products-bag-cross.svg" alt="not found img">
                <h3>Cant find product you want</h3>
                <p class="text-muted text-center">Maybe this product is no longer in our database</p>
                <router-link to="/product"  class="btn btn-green-vintage text-decoration-none">
                    Find Another Products
                </router-link>
            </div>
            <div v-else class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
    </div>
</template>

<script setup>
    import { useRoute, useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import { onMounted, computed, ref, watch } from 'vue';
    import DescriptionCard from '../detail/DescriptionCard.vue'
    import ItemsList from '../home/ItemsList.vue';

    
    const route  = useRoute()
    const router = useRouter()
    const store = useStore()
    const products = computed(() => {
        return store.state.product.products
    })
    const productId = ref(route.params.id)
    const detailStatus = ref(false)
    const productDetail = computed(() => {
        return store.state.product.productDetail
    })
    const userData = computed(() => {
        return store.state.auth.userData
    })
    const isProductNull = ref(false)

    // console.log(store.state.auth.userData)
    
    watch ( route, async (newValue, oldValue) => {
        window.scrollTo(0, 0)
        detailStatus.value = false
        productId.value = route.params.id
        await store.dispatch('product/getProductDetail', productId.value)
        detailStatus.value = true
    })


    onMounted(async () => {
        await store.dispatch('product/getProductDetail', productId.value)   
        if(Object.keys(productDetail.value).length > 1) {
            detailStatus.value = true
        } else {
            isProductNull.value = true
        }
    })
</script>

<style>
    
</style>