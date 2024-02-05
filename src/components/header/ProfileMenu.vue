<template>
    <div class="container-profile-menu d-none d-lg-flex">
        <div class="action-profile-menu">            
            <div class="position-relative align-items-center d-flex">
                <img src="/images/cart.svg" alt="">
                <span v-if="bool" class="position-absolute badge start-0 top-0 rounded-pill bg-danger">
                    1
                </span>
            </div>
            <div class="position-relative align-items-center d-flex">
                <img src="/images/heart-regular.svg" alt="">
                <span v-if="bool" class="position-absolute badge start-0 top-0 rounded-pill bg-danger">
                    1
                </span>
            </div>
        </div>
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="background-color: transparent; color: black; border: 0px; padding: 0px;">
                <img width="48px" height="auto" :src="userData.image" alt="user profile" class="rounded pe-2">
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item d-flex align-items-center" href="#"><img class="me-2" src="/images/person.svg">Profile</a></li>
                <li><a class="dropdown-item d-flex align-items-center" href="#"><img class="me-2" src="/images/receipt.svg">Order</a></li>
                <li><a class="dropdown-item d-flex align-items-center text-danger" href="#"><img class="me-2" src="/images/exit.svg">Logout</a></li>
            </ul>
        </div>
    </div>
    <div v-if="navMobile" class="d-flex justify-content-between gap-2 w-100">
        <div class="d-flex gap-2">
            <img :src="userData.image" alt="user profile" class="rounded" width="50px" height="auto">
            <div class="profile-container">
                <h5 class="m-0">{{ userData.fullname }}</h5>
                <p class="m-0">{{ userData.email }}</p>
            </div>
        </div>
        <div class="d-flex gap-3">
            <div class="position-relative align-items-center d-flex">
                <img src="/images/cart.svg" alt="">
                <span v-if="bool" class="position-absolute badge start-0 top-0 rounded-pill bg-danger">
                    1
                </span>
            </div>
            <div class="position-relative align-items-center d-flex">
                <img src="/images/heart-regular.svg" alt="">
                <span v-if="bool" class="position-absolute badge start-0 top-0 rounded-pill bg-danger">
                    1
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useStore } from 'vuex';
    import { computed } from 'vue';

    defineProps({
        navMobile: Boolean
    })

    const store = useStore()

    const userData = computed(() => {
        return store.state.auth.userData
    })

    const bool = ref(false)
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