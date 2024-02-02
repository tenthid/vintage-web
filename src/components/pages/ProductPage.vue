<template>
    <div class="page d-flex flex-column">
       <!-- ini product page  -->
       <div class="container-md pt-5 pb-5 mb-5" style="flex: 1;">
           <h3 class="mb-2">Items</h3>
           <hr class="my-4" style="color: grey;">
           <div v-if="productFound">
               <items-list :products="filteredList"></items-list>
           </div>
           <div v-else class="d-flex flex-column justify-content-center align-items-center m-auto" style="width: 343px; gap: 16px; height: 100%;">
                <img src="../../assets/images/products-bag-cross.svg" alt="not found img">
                <h3>Product Not Found</h3>
                <p class="text-muted text-center">We cannot find what you looking for, try to use other keywords or reset keyword.</p>
                <button class="btn btn-green-vintage">
                    Reset Keyword
                </button>
            </div>
       </div>
    </div>
</template>

<script setup>
    import ItemsList from '../home/ItemsList.vue';
    import { useStore } from 'vuex';
    import { useRoute } from 'vue-router';
    import { ref, watch, onMounted } from 'vue';

    const store = useStore()
    const route = useRoute()

    const productList = Object.values(store.state.product.products)
    const filteredList = ref()
    const searchParam = ref(route.query.search)
    const productFound = ref()

    watch(route, (newValue, oldValue) => {
        searchParam.value = route.query.search
        console.log('watch jalan')
        filterItems()
    })

    const filterItems = () => {
            console.log('filter jalan')
            if (searchParam.value !== undefined && searchParam.value !== '') {
                filteredList.value = productList.filter(product =>
                    product.name.toLowerCase().includes(searchParam.value.toLowerCase())
                );
                if (filteredList.value.length === 0) {
                    productFound.value = false
                } else {
                    productFound.value = true
                }
            } else {
                // paramDefined.value = false
                filteredList.value = productList
                productFound.value = true
                // console.log("kondisi papramdefined false", recipes.value)
            }
    }

    onMounted(() => {
        filterItems()
    })
</script>

<style>
    
</style>