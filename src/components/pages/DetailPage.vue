<template>
    <div class="page">
        <div class="container-md pt-4 pb-5 mb-5" v-if="detailStatus">
            <!-- <input class="star" type="radio" id="star1" name="rating" value="1">
            <label class="star" for="star1"></label>

            <input class="star" type="radio" id="star2" name="rating" value="2">
            <label class="star" for="star2"></label>

            <input class="star" type="radio" id="star3" name="rating" value="3">
            <label class="star" for="star3"></label>

            <input class="star" type="radio" id="star4" name="rating" value="4">
            <label class="star" for="star4"></label>

            <input class="star" type="radio" id="star5" name="rating" value="5">
            <label class="star" for="star5"></label> -->
            <div class="row">
                <div class="col-8">
                    <img :src="productDetail.image" alt="product image" width="100%" height="auto" class="mb-5">
                    <h4 class="mb-1">Other Product</h4>
                    <items-list :listType="'other'" :products="products" ></items-list>
                </div>
                <div class="col-4">
                    <description-card :productDetail="productDetail"></description-card>
                </div>
            </div>
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
    const products = store.state.product.products
    
    watch (route, (newValue, oldValue) => {
        detailStatus.value = false
        productId.value = route.params.id
        store.dispatch('product/getProductDetail', productId.value)
        detailStatus.value = true
    })

    const productId = ref(route.params.id)
    const detailStatus = ref(false)
    const productDetail = computed(() => {
        return store.state.product.productDetail
    })

    onMounted(async () => {
        await store.dispatch('product/getProductDetail', productId.value)
        detailStatus.value = true
    })
</script>

<style>
    
</style>