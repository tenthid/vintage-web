<template>
    <div class='card'>
        <div class="card-body">
            <div v-if="confirmation">
                <p class=" text-muted">Order Summary</p>
                <div class="row row-cols-2 row-gap-2">
                    <p class="m-0 text-muted">Order</p>
                    <p class="m-0 text-muted text-end">{{ displayedPrice(totalPrice) }}</p>
                    <p class="m-0 text-muted">Protection fee</p>
                    <p class="m-0 text-muted text-end">{{ displayedPrice(protectionFee) }}</p>
                    <p class="m-0 text-muted">Shipping</p>
                    <p class="m-0 text-muted text-end">{{ displayedPrice(props.shipping) }}</p>
                </div>
                <hr>
                <div class="row row-cols-2 mb-3">
                    <h6>Total to pay</h6>
                    <h6 class="text-end">{{ displayedPrice(totalPrice + protectionFee + props.shipping) }}</h6>
                </div>
                <button @click="order()" :class="props.cartItems.length? 'btn btn-green-vintage w-100' : 'btn btn-secondary w-100'">
                    Order Now
                </button>
            </div>
            <div v-else>
                <div class="d-flex justify-content-between">
                    <h4>Order Summary</h4>
                    <h4>{{ displayedPrice(totalPrice) }}</h4>
                </div>
                <div class="d-flex justify-content-between">
                    <p class="m-0 text-muted">{{ totalItems }} Items</p>
                    <p class="m-0 text-muted">Not include shipping fee</p>
                </div>
                <hr>
                <button @click="checkOut()" :class="props.cartItems.length? 'btn btn-green-vintage w-100' : 'btn btn-secondary w-100'">
                    Checkout {{ props.cartItems.length? `(${cartItems.length})`: '' }}
                </button>
            </div>
        </div>
        <teleport to='#app'>
            <div class="bg-danger w-100 p-1" style="position: fixed; z-index: 1; transition: top 0.4s ease-in-out;" :style="{'top' : topPosition + 'px'}">
                <p class="m-0 text-light text-center" style="font-size: 14px;">Your address is not set yet</p>
            </div>
        </teleport>
        <teleport to='body'>
            <basic-modal :topPosition="modalPosition" modalImg="/images/payment-success.gif" :modalTitle="`Order #${historyId} placed successfully`" modalDesc="Thank you for do online shopping at Vintage. You can track and see your order on transaction history menu." modalLink="/profile/transaction-history" modalLinkText="Go to History Transaction" v-if="modalShow">
                <button @click="closeModal()" class="btn btn-outline-green-vintage w-100 mb-3">
                    Continue shoping
                </button>
            </basic-modal>
        </teleport>
    </div>
</template>

<script setup>
    import BasicModal from '../modal/BasicModal.vue';
    import { ref, watch, onMounted, computed } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import { useStore } from 'vuex';

    const props = defineProps({
        confirmation: {type: Boolean, default: false},
        cartItems: Array,
        shipping: Number
    })

    const router = useRouter()
    const store = useStore()
    const route = useRoute()

    const totalPrice = ref(0)
    const totalItems = ref(0)
    const protectionFee = ref(0)
    const cartItems = computed(() => {
        return props.cartItems
    })
    const userAddress = computed(() => {
        return store.state.auth.userData.address
    })
    const topPosition = ref(0)
    const notifTimeOut = ref()
    const modalShow = ref(false)
    const modalPosition = ref(0)
    const historyId = ref(0)

    watch(cartItems, (newValue, oldValue) => {
        totalItems.value = 0
        totalPrice.value = 0
        protectionFee.value = 0
        countTotalAll()
    })

    const countTotalAll = () => {
        cartItems.value.forEach(item => {
            totalPrice.value += parseInt(item.price) * item.quantity
            totalItems.value += item.quantity
            protectionFee.value += parseInt(item.protectionFee)   
        })
    }

    const checkOut = () => {
        if (userAddress.value && props.cartItems.length > 0) {
            router.push('/cart?order=confirmation')
        } else if (!userAddress.value && props.cartItems.length > 0) {
            clearTimeout(notifTimeOut.value)
            topPosition.value = 62
            notifTimeOut.value = setTimeout(() => {
                topPosition.value = 0
            }, 3000)
        }
    }

    const order = async () => {
        const buyHistory = computed(() => {
            if(store.state.cart.buyHistory) {
                return store.state.cart.buyHistory
            } else {
                return {}
            }
        })
        historyId.value = `ORD-${Math.floor(Math.random() * 100000)}-${Math.floor(Math.random() * 1000)}`
        const orderItem = {
            date: new Date().getTime(),
            totalItemPrice: totalPrice.value,
            items: props.cartItems
        }
        buyHistory.value[`${historyId.value}`] = orderItem
        await store.dispatch('cart/addNewTransactionHistory',buyHistory.value)
        if (!route.query.item) {
            await store.dispatch('cart/emptyCart')
        }
        modalShow.value = !modalShow.value
        modalPosition.value = window.scrollY
        document.documentElement.style.overflow = 'hidden';
    }

    const closeModal = () => {
        modalShow.value = false
        document.documentElement.style.overflow = 'auto';
        router.push('/')
    }

    const displayedPrice = (price) => {return parseInt(price).toLocaleString('id-ID', { style: 'currency', currency: 'IDR',minimumFractionDigits: 0,maximumFractionDigits: 0 })}

    onMounted(() => {
        totalItems.value = 0
        totalPrice.value = 0
        protectionFee.value = 0
        countTotalAll()
    })
</script>

<style scoped>

</style>