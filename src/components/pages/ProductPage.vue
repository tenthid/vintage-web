<template>
    <div class="page d-flex flex-column">
       <!-- ini product page  -->
       <div class="container-md pt-4 pb-5 mb-5" style="flex: 1;">
            <div class="d-flex justify-content-between mb-2">
                <h3 class="m-0" v-if="typeParamDefined">{{ typeParamText }}</h3>
                <h3 class="m-0" v-else>{{ brandParamDefined? brandParam + ' Items' : 'Items' }}</h3>
                <div v-if="typeParam === 'favorite'" class="card p-1 px-2" style="width: fit-content; height: fit-content;">
                    <p v-if="filteredList.length > 0" class="m-0" style="font-family: Inter;">
                        {{ filteredList.length + ' items' }}
                    </p>
                    <p v-else class="m-0" style="font-family: Inter;">
                        {{ 'You don’t have any favorite item yet'  }}
                    </p>
                    <!-- <div class="card-body">
                    </div> -->
                </div>
            </div>
            <hr class="my-4" style="color: grey;">
            <div v-if="productFound">
                <items-list :products="filteredList"></items-list>
            </div>
            <div v-else>
                <div v-if="typeParam === 'favorite' && searchParamDefined === false" class="d-flex flex-column justify-content-center align-items-center m-auto" style="width: 343px; gap: 16px; height: 67vh;">
                    <img src="/images/folder-favorite.svg" alt="not found img">
                    <h3>No favorite items yet</h3>
                    <p class="text-muted text-center">When add item to favorite, the item will appear on the favorite list.</p>
                    <router-link to="/product" class="btn btn-green-vintage" style="width: 75%;">
                        Find products
                    </router-link>
                </div>
                <div v-else class="d-flex flex-column justify-content-center align-items-center m-auto" style="width: 343px; gap: 16px; height: 67vh;">
                    <img src="/images/products-bag-cross.svg" alt="not found img">
                    <h3>Product Not Found</h3>
                    <p class="text-muted text-center">We cannot find what you looking for, try to use other keywords or reset keyword.</p>
                    <button @click="resetSearchParam()" class="btn btn-green-vintage" style="width: 75%;">
                        Reset Keyword
                    </button>
                </div>
            </div>
       </div>
    </div>
</template>

<script setup>
    import ItemsList from '../home/ItemsList.vue';
    import { useStore } from 'vuex';
    import { useRoute, useRouter } from 'vue-router';
    import { ref, watch, onMounted, computed, } from 'vue';

    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    // const router = useRouter()

    const isLogin = computed(() => {
        return store.state.auth.isLogin
    })
    const userLikedProduct = ref(store.state.auth.userData.likedList? store.state.auth.userData.likedList : [])

    const productList = store.state.product.products
    const filteredList = ref([])
    const productFound = ref()
    const searchParam = ref(route.query.search)
    const brandParam = ref(route.query.brand)
    const typeParam = ref(route.query.type)
    const searchParamDefined = ref(false)
    const brandParamDefined = ref(false)
    const typeParamDefined = ref(false)
    const typeParamText = ref()

    watch(route, (newValue, oldValue) => {
        typeParam.value = route.query.type
        brandParam.value = route.query.brand
        searchParam.value = route.query.search
        checkSearchParam()
        filterItems()
    })

    watch(() => store.state.auth.userData.likedList, (newValue, oldValue) => {
        if (newValue) {
            userLikedProduct.value = newValue
            filterItems()
        } else {
            userLikedProduct.value = []
            filteredList.value = []
            productFound.value = false
        }
    })

    const checkSearchParam = () => {
        if (searchParam.value !== undefined && searchParam.value !== '') {
            searchParamDefined.value = true
        } else {
            searchParamDefined.value = false
        }
    }

    const filterItems = async () => {
        if (typeParam.value === 'new') {
            typeParamDefined.value = true
            typeParamText.value = 'New Items'
            filteredList.value = await productList.slice().sort(function(a, b) {
                return b.timeUploaded - a.timeUploaded;
            })
            // console.log(filteredList.value[0].timeUploaded > filteredList.value[1].timeUploaded)
            searchParamDefined.value? 
                filteredList.value = productList.filter(product =>
                product.name.toLowerCase().includes(searchParam.value.toLowerCase())) :
                console.warn('no search query')
        } else if(typeParam.value === 'favorite') {
            if (isLogin.value) {
                typeParamText.value = 'Favorite Items'
                typeParamDefined.value = true
                if(userLikedProduct.value) {
                    const arr = ref([])
                    userLikedProduct.value.forEach(productId => {
                        const matchingProduct = productList.find(product => product.id === productId);
                        if (matchingProduct) {
                            arr.value.push(matchingProduct);
                        }
                    })
                    filteredList.value = arr.value
                    searchParamDefined.value? 
                        filteredList.value = filteredList.value.filter(product =>
                        product.name.toLowerCase().includes(searchParam.value.toLowerCase())) :
                        console.error('no search param')
                } else {
                    filteredList.value = []
                }
            } else {
                router.push('/login')
            }
        } else if (brandParam.value !== undefined && brandParam.value !== '') {
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
            brandParamDefined.value = false
            typeParamDefined.value = false
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

    onMounted(async() => {
        if (userLikedProduct.value) {
            userLikedProduct.value = store.state.auth.userData.likedList
        } else {
            userLikedProduct.value = false
        }
        checkSearchParam()
        await filterItems()
    })
</script>

<style>
    
</style>