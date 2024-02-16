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
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
    </div>
</template>

<script setup>
    import { useRoute } from 'vue-router';
    import { useStore } from 'vuex';
    import { onMounted, computed, ref, watch } from 'vue';
    import DescriptionCard from '../detail/DescriptionCard.vue'
    import ItemsList from '../home/ItemsList.vue';

    
    const route  = useRoute()
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
        detailStatus.value = true
    })
</script>

<style>
    
</style>