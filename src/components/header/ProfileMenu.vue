<template>
    <div class="container-profile-menu d-none d-lg-flex">
        <div class="action-profile-menu">            
            <div class="position-relative align-items-center d-flex">
                <router-link to="/cart" style="cursor: pointer;">
                    <img src="/images/cart.svg" alt="cart">
                </router-link>
                <span v-if="userData.cart? true : false" class="position-absolute badge start-0 top-0 rounded-pill bg-danger">
                    {{ userData.cart.length }}
                </span>
            </div>
            <div class="position-relative align-items-center d-flex">
                <router-link to="/product?type=favorite" style="cursor: pointer;">
                    <img src="/images/heart-regular.svg" alt="like">
                </router-link>
                <span v-if="userData.likedList? true : false " class="position-absolute badge start-0 top-0 rounded-pill bg-danger">
                    {{ userData.likedList.length }}
                </span>
            </div>
        </div>
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="background-color: transparent; color: black; border: 0px; padding: 0px;">
                <img width="40px" height="40px" :src="userData.image" alt="user profile" class="rounded-pill">
            </button>
            <ul class="dropdown-menu">
                <li><router-link class="dropdown-item d-flex align-items-center" to="/profile"><img class="me-2" src="/images/person.svg">Profile</router-link></li>
                <li><router-link class="dropdown-item d-flex align-items-center" to="/profile/transaction-history"><img class="me-2" src="/images/receipt.svg">Order</router-link></li>
                <li><a @click="logout()" class="dropdown-item d-flex align-items-center text-danger" style="cursor: pointer;"><img class="me-2" src="/images/exit.svg">Logout</a></li>
            </ul>
        </div>
    </div>
    <div v-if="navMobile" class="d-flex justify-content-between gap-2 w-100">
        <div class="d-flex gap-2" @click="changePage()">
            <img :src="userData.image" alt="user profile" class="rounded-pill" width="50px" height="auto">
            <div class="profile-container">
                <h5 class="m-0">{{ userData.fullname }}</h5>
                <p class="m-0">{{ userData.email }}</p>
            </div>
        </div>
        <div class="d-flex gap-3">
            <div class="position-relative align-items-center d-flex">
                <router-link to="/cart" style="cursor: pointer;">
                    <img src="/images/cart.svg" alt="cart">
                </router-link>
                <span v-if="userData.cart? true : false" class="position-absolute badge start-0 rounded-pill bg-danger" style="top: 9px;">
                    {{ userData.cart.length }}
                </span>
            </div>
            <div class="position-relative align-items-center d-flex">
                <router-link to="/product?type=favorite" style="cursor: pointer;">
                    <img src="/images/heart-regular.svg" alt="like">
                </router-link>
                <span v-if="userData.likedList? true : false " class="position-absolute badge start-0 rounded-pill bg-danger" style="top: 9px;">
                    {{ userData.likedList.length }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, watch } from 'vue';
    import { useStore } from 'vuex';
    import { useRouter, useRoute } from 'vue-router';

    defineProps({
        navMobile: Boolean
    })
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    // watch(route, (newValue, oldValue) => {
    //     document.getElementById('btnNavMobileClose').click()
    // })
    
    const userData = computed(() => {
        return store.state.auth.userData
    })
    const bool = ref(false)

    const logout = async () => {
        store.commit('auth/setUserLogout')
        await store.dispatch('product/getProductData')
        router.push('/')
    }

    const changePage = () => {
        router.push('/profile')
    }
</script>

<style scoped>
    .action-profile-menu {
        display: flex;
        gap: 12px;        
    }

    .container-profile-menu {
        display: flex;
        gap: 32px;
    }

    .badge {
        /* background-color: #CB3A31;
        color: white; */
        font-size: 11px;
        /* position: absolute; */
        margin-left: 15px;
        /* padding: 6px; */
    }

    .profile-container {
        width: 140px; /* Atur lebar container sesuai kebutuhan */
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap; /* Mencegah teks berjalan ke baris baru */
    }
</style>