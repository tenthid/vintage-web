<template>
    <div class="page">
        <div class="container-md pt-4 pb-5 mb-5">
            <div class="row">
                <div class="col-12 col-lg-8">
                    <div v-if="order">

                    </div>
                    <div v-else>
                        <div class="d-flex justify-content-between mb-3">
                            <h3 class="m-0">Cart</h3>
                            <div class="card py-0 px-2" style="height: fit-content;">
                                <p class="m-0" style="font-family: inter;">{{ cartItems.length? `${cartItems.length} Items` : 'You don’t have any item yet' }}</p>
                            </div>
                        </div>
                        <div v-if="cartItems.length" class="mb-4" style="background-color: #EDEDED;">
                            <div class="p-2 d-flex" style="gap: 4px;">
                                <img src="/images/location.svg" alt="location">
                                <p v-if="address" class="m-0" style="font-size: 12px;">Shiping to {{ address.address }}</p>
                                <a @click="setLocation()" v-else class="color-green-vintage" style="cursor: pointer; font-size: 12px;">Set address with your location</a>
                            </div>
                            <div class="d-flex gap-2 pb-2 flex-column">
                                <div v-for="(product, index) in cartItems" :key="index" style="background-color: white; padding: 16px 16px 16px 0px;">
                                    <div class="d-flex gap-3" style="margin-bottom: 12px;">
                                        <img width="80px" height="80px" :src="product.image" alt="product">
                                        <div class="d-flex flex-column justify-content-between">
                                            <div>
                                                <p class="m-0" style="font-family: Inter; font-size: 14px;">{{ product.name }}</p>
                                                <p class="m-0" style="font-family: Inter; font-size: 12px;">{{ product.size }}</p>
                                            </div>
                                            <p class="m-0 fw-bold">{{ displayedPrice(product.price * product.quantity) }}</p>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between" >
                                        <p @click="removeItem(product.id)" class="m-0 text-danger" style="cursor: pointer; font-family: Inter; font-size: 14px;">Remove</p>
                                        <div class="input-group-custom">
                                            <span @click=" () => {product.quantity -= 1; quantityControl(product, index)}" style="cursor: pointer;">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3 8C3 7.72386 3.22386 7.5 3.5 7.5H12.5C12.7761 7.5 13 7.72386 13 8C13 8.27614 12.7761 8.5 12.5 8.5H3.5C3.22386 8.5 3 8.27614 3 8Z" fill="#404040"/>
                                                </svg>
                                            </span>
                                            <input class="form-control-custom input-no-focus" type="text" :id="`quantity${product.id}`" :value="product.quantity" >
                                            <span @click=" () => {product.quantity += 1; quantityControl(product, index)}" style="cursor: pointer;">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 3C8.27614 3 8.5 3.22386 8.5 3.5V7.5H12.5C12.7761 7.5 13 7.72386 13 8C13 8.27614 12.7761 8.5 12.5 8.5H8.5V12.5C8.5 12.7761 8.27614 13 8 13C7.72386 13 7.5 12.7761 7.5 12.5V8.5H3.5C3.22386 8.5 3 8.27614 3 8C3 7.72386 3.22386 7.5 3.5 7.5H7.5V3.5C7.5 3.22386 7.72386 3 8 3Z" fill="#404040"/>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="d-flex flex-column justify-content-center align-items-center m-auto" style="width: 343px; gap: 16px; height: 67vh;">
                            <img src="/images/cart-empty.svg" alt="not found img">
                            <h3>Your cart still empty</h3>
                            <p class="text-muted text-center">Find your favorite items and add to cart before check out.</p>
                            <router-link to="/product"  class="btn btn-green-vintage text-decoration-none" style="width: 75%;">
                                Find Products
                            </router-link>
                        </div>
                        <div class="d-none d-lg-block">
                            <h4 class="mb-1">Other Product</h4>
                            <items-list :listType="'other'" :products="products" ></items-list>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-4" style="position: relative;">
                    <div style="position: sticky; width: 100%; top: 85px;">
                        <order-sum-card :cartItems="cartItems"></order-sum-card>
                    </div>
                    <div class="d-block d-lg-none">
                        <h4 class="mb-1 mt-5">Other Product</h4>
                        <items-list :listType="'other'" :products="products" ></items-list>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import ItemsList from '../home/ItemsList.vue';
    import OrderSumCard from '../cart/OrderSumCard.vue';
    import { useStore } from 'vuex';
    import { computed, onMounted, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import axios from 'axios';

    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const products = computed(() => {
        return store.state.product.products
    })
    const cartItems = computed(() => {
        if (store.state.cart.cartItems) {
            return store.state.cart.cartItems
        } else {
            return []
        }
    })
    const latitude = ref(0)
    const longitude = ref(0)
    const address = ref()
    const order = ref(false)

    const displayedPrice = (price) => {return parseInt(price).toLocaleString('id-ID', { style: 'currency', currency: 'IDR',minimumFractionDigits: 0,maximumFractionDigits: 0 })}

    const quantityControl = async (item, index) => {
        if (item.quantity > 0) {
            cartItems.value[index].quantity = item.quantity
            await store.dispatch('cart/updateCartItems', cartItems.value)
        } else {
            removeItem(item.id)
        }
    }

    const removeItem = async (itemId) => {
        const UID = store.state.auth.userData.userId
        await store.dispatch('cart/updateCartItems', cartItems.value.filter(item => item.id !== itemId))
        await store.dispatch('auth/getUser', UID)
    }

    const setLocation = async () => {
        navigator.geolocation.getCurrentPosition(async position => {
            latitude.value = await position.coords.latitude
            longitude.value = await position.coords.longitude
            const { data } = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude.value},${latitude.value}.json?access_token=pk.eyJ1IjoidGVudGhpZCIsImEiOiJjbHNvOW9yY3AwMjF1MmtuanlvYjM2bWRvIn0.Eh62O1nSska1jqheSsiuJw`)
            address.value = {}
            address.value.address = data.features[0].place_name
            address.value.name = data.features[0].text
        })
    }

    onMounted(async ()  => {
        await store.dispatch('cart/getCartItems')
        // console.log(navigator.geolocation.getCurrentPosition())
    })
</script>

<style scoped>
    .form-control-custom {
        border: 0px ;
        border-right: 1px solid lightgray;
        border-left: 1px solid lightgray;
        width: 35px;
        padding: 4px;
        line-height: 0px;
        text-align: center;
    }

    .input-group-custom {
        border: 1px solid lightgray;
        border-radius: 5px;
        display: flex;
        align-items: center;
        font-size: 14px;
    }

    .input-group-custom span {
        padding: 8px 8px;
        display: flex;
    }
</style>