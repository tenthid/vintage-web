<template>
    <div class="modal-container" :style="{top: topPosition + 'px'}">
        <div class="modal-vintage">
            <img style="width: 189px; height: 189px;" :src="imgSrc" alt="success" loop="false">
            <h1 class="modal-header-vintage text-center">{{ props.modalTitle }}</h1>
            <p class="modal-description-vintage">{{ props.modalDesc }}</p>
            <slot></slot>
            <router-link @click="enableScroll()" class="btn btn-green-vintage w-100" :to="props.modalLink">{{ props.modalLinkText }}</router-link>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, } from 'vue';

    const props = defineProps({
        modalImg: String,
        topPosition: Number,
        modalTitle: String,
        modalDesc: String,
        modalLinkText: String,
        modalLink: String,
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