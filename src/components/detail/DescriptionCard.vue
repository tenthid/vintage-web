<template>
    <div class="card">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <h3 class="m-0">{{ displayedPrice(productDetail.price) }}</h3>
                <i @click="likeControl(route.params.id)" :class="productDetail.isLike? 'fa-solid fa-heart liked' : 'fa-regular fa-heart'" style="font-size: 20px; cursor: pointer;"></i>
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
                    <p>{{ displayedUpload(productDetail.timeUploaded)}}</p>
                    <p>{{ displayedPrice(productDetail.shipping) }}</p>
                </div>
            </div>
            <hr>
            <router-link class="btn btn-green-vintage text-decoration-none w-100 mb-3" to="#">Buy Now</router-link>
            <button @click="addToCart()" class="btn btn-outline-green-vintage w-100" to="#">Add to Cart</button>
            <teleport to='body'>
                <basic-modal :topPosition="modalPosition" :modalImg="'/images/add-to-cart.gif'" :modalTitle="'Product successfully added to cart'" :modalDesc="'“Vintage chicago cubs white” successfully added to cart. Check now on the cart or continue shopping.'" :modalLink="'/cart'" :modalLinkText="'Go to cart'" v-if="modalShow">
                    <button @click="closeModal()" class="btn btn-outline-green-vintage w-100 mb-3">
                        Continue shoping
                    </button>
                </basic-modal>
            </teleport>
            <hr>
            <div class="card">
                <div class="card-body">
                    <div class="d-flex gap-2 w-100" v-if="isLogin">
                        <!-- {{ props.userData }} -->
                        <img width="50px" height="50px" class="rounded-pill" :src="props.userData.image" alt="user profile pic">
                        <div>
                            <p class="mb-1 fw-bold" style="font-family: inter; letter-spacing: 1px;">{{ props.userData.fullname }}</p>
                            <div class="d-flex align-items-center">
                                <div class="fa-solid fa-star me-1" v-for="star in 5" style="font-size: 18px; line-height: 0px; color: lightgray; cursor: pointer;" 
                                :class="{'selected' : star <= rate}"
                                @click="selectStar(star)">
                                    <!-- &#x2605; -->
                            </div>
                                <p class="ms-2 mb-0">({{ Object.values(props.productDetail.rate).length }})</p>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <h6 class="text-center">Rate this product</h6>
                        <p class="m-0 color-green-vintage text-center">You must <router-link class="text-decoration-none" to="/login">login</router-link> or <router-link class="text-decoration-none" to="/signup">signup</router-link> to rate</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref, computed, watch } from 'vue';
    import { useStore } from 'vuex';
    import { useRoute, useRouter } from 'vue-router';
    import BasicModal from '../modal/BasicModal.vue';

    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const props = defineProps({
        productDetail: Object,
        userData: Object
    })

    const isLogin = computed(() => {
        return store.state.auth.isLogin
    })
    const userLikedProduct = computed(() => {
        if(store.state.auth.userData.likedList) {
            return Object.values(store.state.auth.userData.likedList)
        } else {
            return []
        }
    })
    const cartItems = computed(() => {
        if(store.state.auth.userData.cart) {
            return Object.values(store.state.auth.userData.cart)
        } else {
            return []
        }
    })
    const rate = ref(props.productDetail.userRate)
    const modalShow = ref(false)
    const modalPosition = ref()

    watch(() => store.state.auth.userData, (newValue, oldValue) => {
        filterIsLike()
    })
    
    const selectStar = async (star) => {
        const id = route.params.id
        if ( star !== rate.value ) {
            await store.dispatch('product/addRate', { productId: id, rate: star})
            rate.value = star
        }
    }

    const filterIsLike = () => {
        if (isLogin.value) {
            if (userLikedProduct.value.length > 0) {
                userLikedProduct.value.forEach(productId => {
                    // console.log('jalan')
                    if (productId === route.params.id) {
                        // console.log('like')
                        props.productDetail.isLike = true
                    }
                })
            } else {
                // console.log('ga jalan')
                props.productDetail.isLike = false
            }
        }
    }

    const displayedUpload = (time) => {
        const uploadTime = parseInt(time)
        const currentTime = parseInt(new Date().getTime())
        
        const differenceTime = (currentTime - uploadTime) / 1000
        // differenceTime.value = Math.floor(differenceTime.value / 1000)
        if (differenceTime < 60) {
            return `${differenceTime} seconds ago`;
        } else if (differenceTime < 3600) {
            const minutes = Math.floor(differenceTime / 60);
            return `${minutes} minutes ago`;
        } else if (differenceTime < 86400) {
            const hours = Math.floor(differenceTime / 3600);
            return `${hours} hours ago`;
        } else if (differenceTime < 2592000) {
            const days = Math.floor(differenceTime / 86400);
            return `${days} days ago`;
        } else if (differenceTime < 31536000) {
            const months = Math.floor(differenceTime / 2592000);
            return `${months} months ago`;
        } else {
            const years = Math.floor(differenceTime / 31536000);
            return `${years} years ago`;
        }
    }
    
    const displayedPrice = (price) => {return parseInt(price).toLocaleString('id-ID', { style: 'currency', currency: 'IDR',minimumFractionDigits: 0,maximumFractionDigits: 0 })}

    const likeControl = async (productId) => {
        if (isLogin.value) {
            const UID = store.state.auth.userData.userId
            props.productDetail.isLike = !props.productDetail.isLike
            if (props.productDetail.isLike === true) {
                const newLikedProduct = ref([])
                if (userLikedProduct.value) {
                    newLikedProduct.value = [...userLikedProduct.value]
                    if (!newLikedProduct.value.includes(productId)) {
                        newLikedProduct.value.push(productId)
                        props.productDetail.likeCount += 1
                        await store.dispatch('product/updateLikeCount',{id: productId, count: props.productDetail.likeCount.toString()})
                        await store.dispatch('product/getProductData')
                    }
                } else {
                    newLikedProduct.value.push(productId)
                }
                await store.dispatch('auth/updateUserLike', newLikedProduct.value)
            } else {
                // console.log('dislike')
                const newLikedProduct = userLikedProduct.value.filter(product => product !== productId)
                await store.dispatch('auth/updateUserLike', newLikedProduct)
                if (props.productDetail.likeCount > 0) {
                    props.productDetail.likeCount -= 1
                    await store.dispatch('product/updateLikeCount',{id: productId, count: props.productDetail.likeCount.toString()})
                    await store.dispatch('product/getProductData')
                }
            }
            await store.dispatch('auth/getUser', UID)
        } else {
            router.push('/login')
        }
    } 

    const addToCart = async () => {
        const UID = store.state.auth.userData.userId
        if (isLogin.value) {
            const cartItem = {
                id: route.params.id,
                image: props.productDetail.image,
                name: props.productDetail.name,
                price: props.productDetail.price,
                size: props.productDetail.size,
                quantity: 1
            }
            if (cartItems.value.length > 0) {
                const isExist = ref(false)
                cartItems.value.forEach(item => {
                    if(item.id === route.params.id) {
                        item.quantity += 1
                        isExist.value = true
                    }
                })
                if(!isExist.value) {
                    cartItems.value.push(cartItem)
                }
            } else {
                cartItems.value.push(cartItem)
            }
            await store.dispatch('cart/updateCartItems', cartItems.value)
            await store.dispatch('auth/getUser', UID)
            modalShow.value = true
            modalPosition.value = window.scrollY
            document.documentElement.style.overflow = 'hidden';
        } else {
            router.push('/login')
        }
    }

    const closeModal = () => {
        modalShow.value = false
        document.documentElement.style.overflow = 'auto';
    }

    onMounted(() => {
       filterIsLike()
    })
</script>

<style scoped>

.selected {
    color: #FC9918 !important;
}

.liked {
    color: #CB3A31;
}
</style>