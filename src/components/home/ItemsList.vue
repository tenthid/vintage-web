<template>
    <div :class="classType[props.listType]">
        <router-link :to="`/detail/${product.id}`" v-for="product in products" class="item-card d-flex flex-column gap-2 text-decoration-none text-dark">
            <img class="img-fluid" :src="product.image" alt="product image">
            <h3 class="color-green-vintage m-0">{{ displayedPrice(product.price) }}</h3>
            <p class="m-0">{{ product.name }}</p>
            <div class="d-flex justify-content-between align-items-center">
                <p class="m-0">{{ product.size }}</p>
                <div class="d-flex align-items-center gap-1">
                    <i @click.prevent="likeControl(product.id)" :class="product.isLike? 'fa-solid fa-heart liked' : 'fa-regular fa-heart'"></i>
                    <p class="m-0" style="height: 26px;">{{ product.likeCount }}</p>
                </div>
            </div>
        </router-link>
        <slot></slot>
    </div>
</template>

<script setup>
    import { computed, reactive, onMounted, ref, watch } from 'vue';
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';
    // import Cookies from "js-cookie"

    const props = defineProps({
        products: Object,
        listType: {type: String, default: 'default'}
    })

    const store = useStore()  
    const router = useRouter()  

    const classType = reactive({
        'default' : 'mt-4 row row-cols-1 row-cols-sm-3 row-cols-lg-6 row-gap-4',
        'other' : 'mt-4 row row-cols-1 row-cols-sm-2 row-cols-lg-4 row-gap-4'
    })
    const products = computed(() => {
        return props.products
    })
    const userLikedProduct = computed( () => {
        if(store.state.auth.userData.likedList) {
            return Object.values(store.state.auth.userData.likedList)
        } else {
            return []
        }
    })
    const isLogin = computed(() => {
        return store.state.auth.isLogin
    })

    watch(() => store.state.auth.userData, (newValue, oldValue) => {
        filterIsLike()
    })

    const displayedPrice = (price) => {return parseInt(price).toLocaleString('id-ID', { style: 'currency', currency: 'IDR',minimumFractionDigits: 0,maximumFractionDigits: 0 })}

    const filterIsLike = () => {
        if (isLogin.value) {
            if (userLikedProduct.value.length > 0) {
                products.value.forEach(product => {
                    product.isLike = userLikedProduct.value.includes(product.id)
                })
            } else {
                products.value.forEach(product => {
                    product.isLike = false
                })
            }
        }
    }

    const likeControl = async (productId) => {
        if (isLogin.value) {
            const UID = store.state.auth.userData.userId
            products.value.forEach(async product => {
                if (product.id === productId) {
                    product.isLike = !product.isLike
                    if (product.isLike === true) {
                        const newLikedProduct = ref([])
                        if (userLikedProduct.value) {
                            newLikedProduct.value = [...userLikedProduct.value]
                            if (!newLikedProduct.value.includes(productId)) {
                                newLikedProduct.value.push(productId)
                                product.likeCount += 1
                                await store.dispatch('product/updateLikeCount',{id: productId, count: product.likeCount.toString()})
                                await store.dispatch('product/getProductData')
                            }
                        } else {
                            newLikedProduct.value.push(productId)
                            product.likeCount += 1
                            await store.dispatch('product/updateLikeCount',{id: productId, count: product.likeCount.toString()})
                            await store.dispatch('product/getProductData')
                        }
                        await store.dispatch('auth/updateUserLike', newLikedProduct.value)
                    } else {
                        // console.log('dislike')
                        const newLikedProduct = userLikedProduct.value.filter(product => product !== productId)
                        await store.dispatch('auth/updateUserLike', newLikedProduct)
                        if (product.likeCount > 0) {
                            product.likeCount -= 1
                            await store.dispatch('product/updateLikeCount',{id: productId, count: product.likeCount.toString()})
                            await store.dispatch('product/getProductData')
                        }
                    }
                    await store.dispatch('auth/getUser', UID)
                }
            })
        } else {
            router.push('/login')
        }
    }

    onMounted(() => {
        // console.log(isLogin.value)
        // console.log(Object.values(userLikedProduct.value))
        // const UID = Cookies.get('UID')
        // store.dispatch('auth/getUser', UID)
        filterIsLike()
    })
</script>

<style scoped>
    .liked {
        color: #CB3A31;
    }
</style>