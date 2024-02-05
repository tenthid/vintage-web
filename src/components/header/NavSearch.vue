<template>
    <div class="input-group">
        <span class="input-group-text" style="background-color: transparent;">
            <i @click="searchItem()" class="fa-solid fa-magnifying-glass"></i>
        </span>
        <input
            id="searchInput"
            type="text" 
            class="form-control input-no-focus" 
            placeholder="Search for items" 
            style="border-left: 0px; padding-left: 0px;"
            v-model="item"
            @keyup.enter="searchItem()">
    </div>
</template>

<script setup>
    import { useRouter, useRoute } from 'vue-router';
    import { ref, watch, onMounted } from 'vue';

    const router = useRouter()
    const route = useRoute()
    const item = ref()
    const searchParam = ref(route.query.search)
    const brandParam = ref(route.query.brand)

    watch(route, (newValue, oldValue) => {
        searchParam.value = route.query.search
        brandParam.value = route.query.brand
        if (searchParam.value !== undefined && searchParam.value !== '') {
            item.value = searchParam.value
        } else {
            item.value = ''
        }
    })

    const searchItem = () => {
        if (brandParam.value !== undefined && brandParam.value !== '') {
            router.push(`/product?brand=${brandParam.value}&search=${item.value}`)
        } else {
            router.push(`/product?search=${item.value}`)
        }
    }

    onMounted(() => {
        if (searchParam.value !== undefined && searchParam.value !== '') {
            item.value = searchParam.value
        } else {
            item.value = ''
        }
    })
</script>

<style>
    
</style>