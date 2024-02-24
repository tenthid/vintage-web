<template>
    <div class="card">
        <div class="card-body">
            <p class="text-muted mb-4">
                Edit Profile
            </p>
            <div class="d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3 gap-lg-0">
                <p class="fw-bold m-0 text-center text-photo">Photo</p>
                <div class="d-flex flex-column flex-sm-row align-items-center justify-content-between gap-2 gap-lg-5">
                    <div class="d-flex flex-column flex-sm-row align-items-center gap-4">
                        <img :src="modifyUserData.image" alt="user profile pic" class="rounded-pill responsive-img">
                        <div class="d-flex gap-3 gap-lg-0">
                            <button @click="imageInputClick()" class="btn btn-choose">Choose</button>
                            <img class="d-block d-lg-none" @click="deletProfileImage()" src="/images/trash.svg" alt="trash icon">
                        </div>
                        <p class="m-0 text-muted">JPG, JPEG, or PNG, 1 MB max</p>
                    </div>
                    <img class="d-none d-lg-block" style="cursor: pointer;" @click="deletProfileImage()" src="/images/trash.svg" alt="trash icon">
                </div>
            </div>
            <hr class="my-4" style="color: lightgrey;">
            <form @submit.prevent="updateProfile()">
                <div class="d-none">
                    <input @input="renderImage" type="file" id="inputImage">
                </div>
                <div class="mb-3">
                    <basic-input v-model="modifyUserData.fullname" identity="fullname" :withSpan="false" type="text" label="Full name" placeholder="Modify your full name"></basic-input>
                </div>
                <div class="mb-3">
                    <basic-input v-model="modifyUserData.username" identity="username" :withSpan="false" type="text" label="Username" placeholder="Modify your username"></basic-input>
                </div>
                <div class="mb-3">
                    <basic-input v-model="modifyUserData.email" identity="email" :withSpan="false" type="email" label="Email" placeholder="Modify your email">
                        <!-- <button @click.prevent="verifyEmail()" style="white-space: nowrap;" class="btn btn-outline-green-vintage" title="you must verify email before change it">
                            verify email
                        </button> -->
                    </basic-input>
                    <!-- <span class="p-2 rounded bg-danger>!</span> -->
                </div>
                <div class="mb-4">
                    <basic-input v-model="modifyUserData.address" identity="address" :withSpan="false" type="text"  label="Address" placeholder="Modify your address">
                        <button @click.prevent="setLocation()" class="btn btn-outline-green-vintage">
                            Auto
                        </button>
                    </basic-input>
                </div>
                <div class="d-flex justify-content-end">
                    <button class="btn btn-green-vintage">
                        Update Profile
                    </button>
                </div>
            </form>
        </div>
    </div>
    <teleport to='body'>
        <div class="w-100 p-1" :class="isError? 'bg-danger' : 'bg-success'" style="position: fixed; z-index: 1; transition: top 0.4s ease-in-out;" :style="{'top' : topPosition + 'px'}">
            <p class="m-0 text-light text-center" style="font-size: 14px;">{{ notifMessage }}</p>
        </div>
    </teleport>
</template>

<script setup>
    import BasicInput from '../ui/BasicInput.vue';
    import { reactive,ref } from 'vue';
    import { useStore } from 'vuex';
    import axios from 'axios';

    const props = defineProps({
        userData: Object
    })
    const store = useStore()

    const modifyUserData = reactive({
        fullname: props.userData.fullname,
        username: props.userData.username,
        email: props.userData.email,
        image: props.userData.image,
        likedList: props.userData.likedList,
        cart: props.userData.cart,
        buyHistory: props.userData.buyHistory,
        userId: props.userData.userId,
        address: props.userData.address
    })
    const topPosition = ref(0)
    const notifTimeOut = ref()
    const isError = ref()
    const notifMessage = ref()

    const showNotif = () => {
        clearTimeout(notifTimeOut.value)
            topPosition.value = 62
            notifTimeOut.value = setTimeout(() => {
                topPosition.value = 0
        }, 3000)
    }

    const updateProfile = async () => {
        isError.value = await store.dispatch('auth/updateUserEmail', modifyUserData)
        isError.value? notifMessage.value = 'Failed to update your details' : notifMessage.value = 'Updated your details successfully'
        // await store.dispatch('auth/updateUserProfile', modifyUserData)
    }

    const imageInputClick = () => {
        document.getElementById('inputImage').click()
    }

    const deletProfileImage = () => {
        modifyUserData.image = 'images/user.png'
    }

    const renderImage = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.addEventListener("load", () => {
        modifyUserData.image = reader.result;
      });
    }

    const setLocation = async () => {
        navigator.geolocation.getCurrentPosition(async position => {
            // latitude.value = await position.coords.latitude
            // longitude.value = await position.coords.longitude
            const { data } = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${position.coords.longitude},${position.coords.latitude}.json?access_token=pk.eyJ1IjoidGVudGhpZCIsImEiOiJjbHNvOW9yY3AwMjF1MmtuanlvYjM2bWRvIn0.Eh62O1nSska1jqheSsiuJw`)
            modifyUserData.address = data.features[0].place_name
            // address.value.name = data.features[0].text
        })
    }

    const verifyEmail = async () => {
        isError.value = await store.dispatch('auth/sendOobVerify', modifyUserData.email)
        showNotif()
        isError.value? notifMessage.value = 'Failed to sent vaerification link' : notifMessage.value = 'We have sent a verification link into your new email'
    }
    // onMounted(() => {
    //     Object.assign(modifyUserData, props.userData)
    //     console.log(modifyUserData)
    // })
</script>

<style scoped>
    .btn-choose {
    border-radius: 4px;
    background: var(--Neutral-20, #F5F5F5);
    /* Shadow/sm */
    box-shadow: 0px 1px 3px 0px rgba(16, 24, 40, 0.10), 0px 1px 2px 0px rgba(16, 24, 40, 0.06);
    }

    .responsive-img {
        width: 64px;
        height: 64px;
    }

    @media (max-width: 426px) {
        .responsive-img {
            width: 220px;
            height: 220px;
        }

        .text-photo {
            font-size: 25px;
        }
    }
</style>