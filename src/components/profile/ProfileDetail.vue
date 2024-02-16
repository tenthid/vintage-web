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
                    <basic-input v-model="modifyUserData.email" identity="email" :withSpan="false" type="email" label="Email" placeholder="Modify your email"></basic-input>
                </div>
                <div class="d-flex justify-content-end">
                    <button class="btn btn-green-vintage">
                        Update Profile
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
    import BasicInput from '../ui/BasicInput.vue';
    import { reactive } from 'vue';
    import { useStore } from 'vuex';

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
        userId: props.userData.userId
    })

    const updateProfile = async () => {
        await store.dispatch('auth/updateUserEmail', modifyUserData)
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