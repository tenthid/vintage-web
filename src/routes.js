import AuthLayout from './layouts/AuthLayout.vue'
import MainLayout from './layouts/MainLayout.vue'
import HomePage from "./components/pages/HomePage.vue"
import LoginPage from "./components/pages/LoginPage.vue"
import SignupPage from './components/pages/SignupPage.vue'
import ProductPage from './components/pages/ProductPage.vue'
import DetailPage from './components/pages/DetailPage.vue'
import ProfilePage from './components/pages/ProfilePage.vue'
import ProfileDetail from '@/components/profile/ProfileDetail.vue'
import ResetPassword from './components/profile/ResetPassword.vue' 
import TransactionHistory from './components/profile/TransactionHistory.vue'
import CartPage from './components/pages/CartPage.vue'
import { store } from './store/index'
import Cookies from "js-cookie"

const checkAuth = async () => {
    const UID = Cookies.get('UID')
    const token = Cookies.get('token')
    const expireDate = parseInt(Cookies.get('expireDate'))
    try {
        if (UID && expireDate && token) {
            if(expireDate > new Date().getTime()) {
                await store.dispatch('auth/getUser', UID)
                store.commit('auth/setToken', {idToken: token, expiresIn: expireDate})
                // console.log(new Date(Date.now()), new Date(parseInt(expireDate)))
                return true
            } else {
                store.commit('auth/setUserLogout')
                return false
            }
        } else {
            return false
        }
    } catch(err) {
        console.log(err)
    }
}

export const routes = [
    { path: '/', name: 'mainLayoutinHome', component: HomePage,
        meta: {
            layout: MainLayout
        },
        beforeEnter: async () => {
            await checkAuth()
        }
    },
    { path: '/product', name: 'mainLayoutinProduct', component: ProductPage,
        meta: {
            layout: MainLayout
        },
        beforeEnter: async () => {
            await checkAuth()
        }
    },
    { path: '/detail/:id', name: 'mainLayoutinDetail', component: DetailPage,
        meta: {
            layout: MainLayout
        },
        beforeEnter: async () => {
            await checkAuth()
        }
    },
    { path: '/login', name: 'authLayoutinLogin', component: LoginPage,
        meta: {
            layout: AuthLayout
        },
        beforeEnter: async (to, from, next) => {
            await checkAuth()? next(false) : next()
        }
    },
    { path: '/signup', name: 'authLayoutinSignup', component: SignupPage,
        meta: {
            layout: AuthLayout
        },
        beforeEnter: async (to, from, next) => {
            await checkAuth()? next(false) : next()
        }
    },
    { path: '/cart', name: 'mainLayoutinCart', component: CartPage,
        meta: {
            layout: MainLayout
        },
        beforeEnter: async (to, from, next) => {
            await checkAuth()? next() : next('/login')
        }
    },
    { path: '/profile', name: 'mainLayoutinProfile', component: ProfilePage,
        meta: {
            layout: MainLayout
        },
        children: [
            { path: '', name:'profileDetail', component: ProfileDetail},
            { path: 'change-password', name:'changePassword', component: ResetPassword},
            { path: 'transaction-history', name:'transactionHistory', component: TransactionHistory},
        ],
        beforeEnter: async (to, from, next) => {
            await checkAuth()? next() : next('/login')
        }
    }
]