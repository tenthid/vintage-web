<template>
    <div class="modal-container" :style="{top: topPosition + 'px'}">
        <div class="modal-vintage">
            <img style="width: 189px; height: 189px;" :src="imgSrc" alt="success" loop="false">
            <h1 class="modal-header-vintage">Succesfully Register</h1>
            <p class="modal-description-vintage">Thank you for register at vintage. Start find your favorite pre-loved product here.</p>
            <router-link @click="enableScroll()" class="btn btn-green-vintage w-100" to="/">Go to Home Page</router-link>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, } from 'vue';

    const props = defineProps({
        modalImg: String,
        topPosition: Number
    })

    const imgSrc = ref('')

    const enableScroll = () => {
        document.documentElement.style.overflow = 'auto';
    }

    onMounted(async() => {
        imgSrc.value = `${props.modalImg}?version=${Date.now()}`
    })
</script>

<style>
    
</style>