<template>
    <div class="page d-flex flex-column">
       <!-- ini product page  -->
       <div class="container-md pt-4 pb-5 mb-5" style="flex: 1;">
           <h3 class="mb-2">{{ brandParamDefined? brandParam + ' Items' : 'Items' }} </h3>
           <hr class="my-4" style="color: grey;">
           <div v-if="productFound">
               <items-list :products="filteredList"></items-list>
           </div>
           <div v-else class="d-flex flex-column justify-content-center align-items-center m-auto" style="width: 343px; gap: 16px; height: 67vh;">
                <img src="/images/products-bag-cross.svg" alt="not found img">
                <h3>Product Not Found</h3>
                <p class="text-muted text-center">We cannot find what you looking for, try to use other keywords or reset keyword.</p>
                <button @click="resetSearchParam()" class="btn btn-green-vintage">
                    Reset Keyword
                </button>
            </div>
       </div>
    </div>
</template>

<script setup>
    import ItemsList from '../home/ItemsList.vue';
    import { useStore } from 'vuex';
    import { useRoute, useRouter } from 'vue-router';
    import { ref, watch, onMounted } from 'vue';

    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const productList = store.state.product.products
    const filteredList = ref()
    const searchParam = ref(route.query.search)
    const productFound = ref()
    const brandParam = ref(route.query.brand)
    const searchParamDefined = ref(false)
    const brandParamDefined = ref(false)

    watch(route, (newValue, oldValue) => {
        brandParam.value = route.query.brand
        searchParam.value = route.query.search
        checkSearchParam()
        filterItems()
    })

    const checkSearchParam = () => {
        if (searchParam.value !== undefined && searchParam.value !== '') {
            searchParamDefined.value = true
        } else {
            searchParamDefined.value = false
        }
    }

    const filterItems = () => {
        if (brandParam.value !== undefined && brandParam.value !== '') {
            brandParamDefined.value = true
            filteredList.value = productList.filter(product =>
                product.brand.toLowerCase() === brandParam.value.toLowerCase() &&
                (!searchParamDefined.value || 
                    product.name.toLowerCase().includes(searchParam.value.toLowerCase()))
            );
        } else if (searchParamDefined.value) {
            filteredList.value = productList.filter(product =>
                product.name.toLowerCase().includes(searchParam.value.toLowerCase())
            );
        } else {
            filteredList.value = productList
            productFound.value = true
        }

        // if item not found
        if (filteredList.value.length === 0) {
            productFound.value = false
        } else {
            productFound.value = true
        }
    }

    const resetSearchParam = () => {
        // if (brandParam.value !== undefined && brandParam.value !== '') {
        //     router.push(`/product?brand=${brandParam.value}`)
        // } else {
        //     router.push(`/product`)
        // }
        document.getElementById('searchInput').focus()
        document.getElementById('searchInput').value = ''
    }

    onMounted(() => {
        checkSearchParam()
        filterItems()
    })
</script>

<style>
    
</style>