import AuthLayout from './layouts/AuthLayout.vue'
import MainLayout from './layouts/MainLayout.vue'
import HomePage from "./components/pages/HomePage.vue"
import LoginPage from "./components/pages/LoginPage.vue"
import SignupPage from './components/pages/SignupPage.vue'
import ProductPage from './components/pages/ProductPage.vue'

export const routes = [
    { path: '/', name: 'mainLayoutinHome', component: MainLayout,
        children: [
            {path: '', name:'homePage', component: HomePage}
        ]
    },
    { path: '/product', name: 'mainLayoutinProduct', component: MainLayout,
        children: [
            {path: '', name:'productPage', component: ProductPage}
        ]
    },
    { path: '/login', name: 'authLayoutinLogin', component: AuthLayout,
        children: [
            {path: '', name: 'loginPage', component: LoginPage}
        ]
    },
    { path: '/signup', name: 'authLayoutinSignup', component: AuthLayout,
        children: [
            {path: '', name: 'signupPage', component: SignupPage}
        ]
    }
]