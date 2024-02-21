<template>
    <div class="card mt-3">
        <div class="card-body d-flex flex-column">
            <p class="text-muted">{{ text }}</p>
            <div class="card">
                <div class="card-body d-flex gap-2">
                    <img width="40px" height="40px" :src="image" alt="order detail image">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        image: String,
        text: String
    })
</script>

<style>
    
</style>