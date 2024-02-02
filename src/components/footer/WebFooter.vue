<template>
    <footer class="bg-green-vintage">
        <!-- ini footer -->
        <div class="container-md py-5 d-flex flex-column gap-5">
            <footer-menu :footerList="footerList"></footer-menu>
            <div>
                <hr class="text-light">
                <div class="d-flex justify-content-between mt-4">
                    <div class="d-flex gap-4">
                        <a href="https:/whatsapp.com" target="_blank">
                            <img src="../../assets/images/whatsapp.svg" alt="whatsapp">
                        </a>
                        <a href="https:/instagram.com" target="_blank">
                            <img src="../../assets/images/instagram.svg" alt="instagram">
                        </a>
                        <a href="https:/linkedin.com" target="_blank">
                            <img src="../../assets/images/linkedin.svg" alt="linkedin">
                        </a>
                    </div>
                    <p class="copyright-text">ⓒ Vintage, 2023</p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
    import FooterMenu from './FooterMenu.vue';

    const footerList = {
        'Vintage' : {
            'About us' : '#',
            'Sustainability' : '#',
            'Blog' : '#',
            'Advertising' : '#'
        },
        'Discover' : {
            'How it works' : '#',
            'Help center' : '#',
            'Infoboard' : '#',
            'Mobile apps' : '#',
        },
        'Help' : {
            'Help center' : '#',
            'Buying' : '#',
            'Trust & Safety' : '#',
        },
        'Comunity' : {
            'Forum' : '#',
        },
    }
</script>

<style scoped>
    .copyright-text {
        color: #FFF;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
    }
</style>