<template>
    <div>
        <section id="hero" class="d-flex align-items-center">
            <card-sell></card-sell>
        </section>
        <div class="container-md py-5 mt-2 mb-5">
            <popular-items></popular-items>
            <brand-shop></brand-shop>
            <new-product></new-product>
        </div>
    </div>
</template>

<script setup>
    import CardSell from '../home/CardSell.vue'
    import PopularItems from '../home/PopularItems.vue'
    import NewProduct from '../home/NewProduct.vue';
    import BrandShop from '../home/BrandShop.vue';
</script>

<style scoped>
    #hero {
        background: url('/images/home-bg.png') no-repeat; 
        background-size: 100% auto; 
        height: 528px;
        padding: 0px 120px;
        margin-top: 61px;
    }

    @media (max-width: 1024px) {
        #hero {
            background-size: auto 100%;
        }
    }

    @media (max-width: 427px) {
        #hero {
            padding: 0px 50px;
        }
    }
</style>