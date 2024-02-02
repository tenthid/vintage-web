<template>
    <div class="input-group">
        <span class="input-group-text" style="background-color: transparent;">
            <i @click="searchItem()" class="fa-solid fa-magnifying-glass"></i>
        </span>
        <input 
            type="text" 
            class="form-control" 
            placeholder="Search for items" 
            style="border-left: 0px; padding-left: 0px;"
            v-model="item"
            @keyup.enter="searchItem()">
    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router';
    import { ref } from 'vue';

    const router = useRouter()
    const item = ref()

    const searchItem = () => {
        router.push(`/product?search=${item.value}`)
    }
</script>

<style>
    
</style>