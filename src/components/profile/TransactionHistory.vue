<template>
    <div class="card">
        <div class="card-body">
            <p class="mb-3 text-muted">My Order</p>
            <div v-if="buyHistory" class="d-flex flex-column gap-2">
                <div v-for="(item, key) in sortedBuyHistory" class="card">
                    <div class="card-body">
                        <div class="d-flex gap-2 align-items-center w-100 mb-4">
                            <img src="/images/transaction-bag-icon.svg" alt="bag icon">
                            <p class="m-0 fw-bold" style="font-size: 14px;">Shopping</p>
                            <p class="m-0" style="font-size: 14px;">{{ `${months[new Date((item.date)).getMonth()]} ${new Date((item.date)).getDate()}, ${new Date((item.date)).getFullYear()}` }}</p>
                            <span class="px-2 rounded-pill" style="background-color: rgba(16, 175, 19, 0.1);">
                                <p class="m-0" style="font-size: 14px; color: #10AF13;">Done</p>
                            </span>
                            <p class="m-0" style="font-size: 14px;">{{ key }}</p>
                        </div>
                        <div class="row">
                            <div class="d-flex align-items-center gap-4 mb-2 col-9">
                                <img width="64px" height="64px" :src="item.items[0].image" alt="item image">
                                <div class="d-flex flex-column gap-2">
                                    <p class="m-0 fw-bold">{{ `${item.items[0].name} - ${item.items[0].color} ` }}</p>
                                    <p class="m-0" style="font-size: 14px;">{{ `${item.items[0].quantity} product x ${displayedPrice(item.items[0].price)}` }}</p>
                                    <p class="m-0" style="font-size: 14px;">{{ `${item.items[0].size}` }}</p>
                                </div>
                            </div>
                            <div class="ps-4 pb-2 col-3" style="border-left: 1px lightgray solid; height: fit-content;">
                                <p class="mb-1" style="font-size: 14px;">Total price</p>
                                <p class="m-0 fw-bold">{{ displayedPrice(item.totalItemPrice) }}</p>
                            </div>
                        </div>
                        <p v-if="item.items.length > 1" class="m-0" style="font-size: 14px;">{{ `+ ${item.items.length - 1} more ${item.items.length - 2? 'products' : 'product'}` }}</p>
                        <hr>
                        <div class="d-flex justify-content-end">
                            <button @click="rebuyItems(key)" class="btn btn-green-vintage">Buy again</button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="d-flex flex-column justify-content-center align-items-center p-3">
                <img src="/images/transaction-bag.svg" alt="not found img">
                <h3>No orders yet</h3>
                <p class="text-muted text-center">When you buy an item, your order about it will appear here.</p>
                <router-link to="/product" class="btn btn-green-vintage" style="width: 200px;">
                    Shop now
                </router-link>
            </div>
        </div>
    </div>
    <teleport to='body'>
        <div class="bg-danger w-100 p-1" style="position: fixed; z-index: 1; transition: top 0.4s ease-in-out;" :style="{'top' : topPosition + 'px'}">
            <p class="m-0 text-light text-center" style="font-size: 14px;">Your address is not set yet</p>
        </div>
    </teleport>
</template>

<script setup>
    import { useStore } from 'vuex';
    import { onMounted, computed, ref } from 'vue';
    import { useRouter } from 'vue-router';

    const props = defineProps({
        userData: Object
    })

    const store = useStore()
    const router = useRouter()

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const buyHistory = computed(() => {
        if (store.state.cart.buyHistory) {
            return store.state.cart.buyHistory
        } else {
            return false
        }
    })
    const sortedBuyHistory = ref()
    const userAddress = computed(() => {
        return props.userData.address
    })
    const topPosition = ref(0)
    const notifTimeOut = ref()

    const rebuyItems = (key) => {
        if (userAddress.value) {
            router.push(`/cart?order=confirmation&rebuy=${key}`)
        } else {
            clearTimeout(notifTimeOut.value)
            topPosition.value = 62
            notifTimeOut.value = setTimeout(() => {
                topPosition.value = 0
            }, 3000)
        }
    }

    const displayedPrice = (price) => {return parseInt(price).toLocaleString('id-ID', { style: 'currency', currency: 'IDR',minimumFractionDigits: 0,maximumFractionDigits: 0 })}

    onMounted(async() => {
        await store.dispatch('cart/getBuyHistory')
        sortedBuyHistory.value = Object.fromEntries(
        Object.entries(buyHistory.value).sort(([,a], [,b]) => b.date - a.date)
        );
    })
</script>

<style>
    
</style>