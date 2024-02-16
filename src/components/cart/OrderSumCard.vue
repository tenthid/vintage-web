<template>
    <div class='card'>
        <div class="card-body">
            <div v-if="confirmation">
                
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
            </div>
            <hr>
            <div :class="props.cartItems.length? 'btn btn-green-vintage w-100' : 'btn btn-secondary w-100'">
                Checkout {{ props.cartItems.length? `(${cartItems.length})`: '' }}
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, watch, onMounted, computed } from 'vue';

    const props = defineProps({
        confirmation: {type: Boolean, default: false},
        cartItems: Array
    })

    const totalPrice = ref(0)
    const totalItems = ref(0)
    const cartItems = computed(() => {
        return props.cartItems
    })

    watch(cartItems, (newValue, oldValue) => {
        totalItems.value = 0
        totalPrice.value = 0
        countTotalItems()
        countTotalPrice()
    })

    const countTotalPrice = () => {
        cartItems.value.forEach(item => {
            totalPrice.value += parseInt(item.price) * item.quantity
        })
    }
    
    const countTotalItems = () => {
        cartItems.value.forEach(item => {
            totalItems.value += item.quantity
        })
    }

    const displayedPrice = (price) => {return parseInt(price).toLocaleString('id-ID', { style: 'currency', currency: 'IDR',minimumFractionDigits: 0,maximumFractionDigits: 0 })}

    onMounted(() => {
        totalItems.value = 0
        totalPrice.value = 0
        countTotalItems()
        countTotalPrice()
    })
</script>

<style scoped>
</style>