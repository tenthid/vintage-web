<template>
    <div class="page pb-lg-5" :class="isActive.transHistory? 'page-custom-transaction' : 'page-custom'" style="background-color: #F5F5F5;">
        <div class="container-md py-5 mb-lg-5">
            <div class="row ">
                <div class="col-4 d-none d-lg-block">
                    <h3 class="mb-5">Settings</h3>
                    <ul style="list-style-type: none;" class="ps-3">
                        <li class="text-decoration-none text-menu" ><router-link class="text-decoration-none" :class="isActive.detail? ['text-dark', 'fw-bold'] : 'text-muted'"  to="/profile" style="transition: all 0.5ms ease-in-out;">Profile details</router-link></li>
                        <li class="text-decoration-none text-menu"><router-link class="text-decoration-none text-muted" :class="isActive.changePass? ['text-dark', 'fw-bold'] : 'text-muted'" to="/profile/change-password" style="transition: all 0.5ms ease-in-out;">Change Password</router-link></li>
                        <li class="text-decoration-none text-menu"><router-link class="text-decoration-none text-muted" :class="isActive.transHistory? ['text-dark', 'fw-bold'] : 'text-muted'" to="/profile/transaction-history" style="transition: all 0.5ms ease-in-out;">Transaction History</router-link></li>
                    </ul>
                </div>
                <div class="col-12 col-lg-8 ">
                    <router-view :userData="userData"></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { computed, watch, reactive, onMounted, ref } from 'vue';
    import { useStore } from 'vuex';
    import { useRoute } from 'vue-router';

    const store = useStore()
    const route = useRoute()
    
    const path = ref()
    const userData = computed(() => {
        return store.state.auth.userData
    })
    const isActive = reactive({
        detail: false,
        changePass: false,
        transHistory: false
    })

    const isActiveControl = () => {
        if (path.value === '/profile') {
            isActive.detail = true
        } else {
            isActive.detail = false
        }

        if (path.value === '/profile/change-password') {
            isActive.changePass = true
        } else {
            isActive.changePass = false
        }

        if (path.value === '/profile/transaction-history') {
            isActive.transHistory = true
        } else {
            isActive.transHistory = false
        }
    }

    watch(route, (newValue, oldValue) => {
        path.value = route.path
        isActiveControl()
    })

    onMounted(() => {
        path.value = route.path
        isActiveControl()
    })
</script>

<style scoped>
    .text-menu {
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: normal;
        line-height: 24px;
        margin-bottom: 36px;
    }

    .page-custom {
        height: 92vh !important;
    }

    @media (max-width: 426px) {
        .page-custom {
            height: fit-content !important;
        }
    }
</style>