import AuthLayout from './layouts/AuthLayout.vue'
import MainLayout from './layouts/MainLayout.vue'
import HomePage from "./components/pages/HomePage.vue"
import LoginPage from "./components/pages/LoginPage.vue"
import SignupPage from './components/pages/SignupPage.vue'
import ProductPage from './components/pages/ProductPage.vue'
import DetailPage from './components/pages/DetailPage.vue'
import { store } from './store/index'
import Cookies from "js-cookie"

const checkAuth = async () => {
    const UID = Cookies.get('UID')
    const token = Cookies.get('token')
    const expireDate = parseInt(Cookies.get('expireDate'))
    try {
        if (UID && expireDate && token) {
            if(expireDate > new Date().getTime()) {
                store.commit('auth/setToken', {idToken: token, expiresIn: expireDate})
                await store.dispatch('auth/getUser', UID)
                // console.log(new Date(Date.now()), new Date(parseInt(expireDate)))
                return true
            } else {
                store.commit('auth/setUserLogout')
                return false
            }
        }
    } catch(err) {
        console.log(err)
    }
}

export const routes = [
    { path: '/', name: 'mainLayoutinHome', component: MainLayout,
        children: [
            {path: '', name:'homePage', component: HomePage}
        ],
        beforeEnter: () => {
            checkAuth()
        }
    },
    { path: '/product', name: 'mainLayoutinProduct', component: MainLayout,
        children: [
            {path: '', name:'productPage', component: ProductPage}
        ]
    },
    { path: '/detail/:id', name: 'mainLayoutinDetail', component: MainLayout,
        children: [
            {path: '', name: 'detailPage', component: DetailPage}
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