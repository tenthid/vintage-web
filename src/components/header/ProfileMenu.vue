<template>
    <div class="container-profile-menu d-none d-lg-flex">
        <div class="action-profile-menu">            
            <div class="position-relative align-items-center d-flex">
                <img src="../../assets/images/cart.svg" alt="">
                <span v-if="bool" class="position-absolute badge start-0 top-0 rounded-pill bg-danger">
                    1
                </span>
            </div>
            <div class="position-relative align-items-center d-flex">
                <img src="../../assets/images/heart-regular.svg" alt="">
                <span v-if="bool" class="position-absolute badge start-0 top-0 rounded-pill bg-danger">
                    1
                </span>
            </div>
        </div>
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="background-color: transparent; color: black; border: 0px; padding: 0px;">
                <img src="../../assets/images/logo.svg" alt="user profile" class="rounded pe-2">
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
            </ul>
        </div>
    </div>
    <div v-if="navMobile" class="d-flex justify-content-between gap-2 w-100">
        <div class="d-flex gap-2">
            <img src="../../assets/images/logo.svg" alt="user profile" class="rounded">
            <div>
                <h5 class="m-0">your name</h5>
                <p class="m-0">youremail@gmail.com</p>
            </div>
        </div>
        <div class="d-flex gap-3">
            <div class="position-relative align-items-center d-flex">
                <img src="../../assets/images/cart.svg" alt="">
                <span v-if="bool" class="position-absolute badge start-0 top-0 rounded-pill bg-danger">
                    1
                </span>
            </div>
            <div class="position-relative align-items-center d-flex">
                <img src="../../assets/images/heart-regular.svg" alt="">
                <span v-if="bool" class="position-absolute badge start-0 top-0 rounded-pill bg-danger">
                    1
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    defineProps({
        navMobile: Boolean
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
</style>