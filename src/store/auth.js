import axios from "axios";
import Cookies from "js-cookie";


export default {
    namespaced: true,
    state () {
        return {
            authLinkSignup: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAtGzsOA_3SpBii43hp81-niux0gAIs3Pk',
            authLinkSignin: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAtGzsOA_3SpBii43hp81-niux0gAIs3Pk',
            rtdbLink: 'https://vue-js-project-67129-default-rtdb.firebaseio.com/',
            userKey: '',
            token: null,
            expiresIn: null,
            userData: {},
            isLogin: false
        }
    },

    getters: {

    },

    mutations: {
        setUserLogin(state, {userData, loginStatus, userKey, userId}) {
            state.userData = userData
            state.isLogin = loginStatus
            state.userKey = userKey
            Cookies.set('UID', userId)
        },
        setToken(state, {idToken, expiresIn}) {
            state.token = idToken
            state.expiresIn = expiresIn
            Cookies.set('token', idToken)
            Cookies.set('expireDate', expiresIn)
        },
        setUserLogout(state) {
            state.userKey = null
            state.token = null
            state.expiresIn = null
            state.userData = null
            state.isLogin = false
            Cookies.remove('UID')
            Cookies.remove('expireDate')
            Cookies.remove('token')
        }
    },

    actions: {
        async userRegister({commit, dispatch, state}, payload) {
            const userData = {
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            }
            try {
                const { data } = await axios.post(state.authLinkSignup, userData)
                commit("setToken", {    
                    idToken: data.idToken,
                    expiresIn: new Date().getTime() + Number.parseInt(data.expiresIn) * 1000
                })
                const addUserData = {
                    userId: data.localId,
                    fullname: payload.fullname,
                    username: payload.username,
                    email: payload.email,
                    image: payload.image,
                    likedList: ['null'],
                    cart: ['null'],
                    buyHistory: ['null']
                }
                await dispatch('addUser', addUserData)
            } catch(err) {
                console.log(err)
            }
        },
        async addUser({commit, state, dispatch}, payload) {
            try {
                const { data } = await axios.post(`${state.rtdbLink}users.json?auth=${state.token}`, payload)
                await dispatch('getUser', payload.userId)
            } catch(err) {
                console.log(err)
            }
        },
        async userLogin({commit, dispatch, state}, payload) {
            const userData = {
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            }
            try {
                const { data } = await axios.post(state.authLinkSignin, userData)
                console.log(new Date(Date.now() + parseInt(data.expiresIn)))
                commit("setToken", {    
                    idToken: data.idToken,
                    expiresIn: new Date().getTime() + Number.parseInt(data.expiresIn) * 1000
                })
                dispatch('getUser', data.localId)
            } catch(err) {
                console.log(err)
            }
        },
        async getUser({commit, state}, payload) {
            try {
                const { data } = await axios.get(`${state.rtdbLink}users.json`)
                for (let key in data) {
                    if (data[key].userId === payload) {
                        commit("setUserLogin", {
                            userData: data[key], 
                            loginStatus: true,
                            userKey: key,
                            userId: payload
                        })
                    }
                }
            } catch(err) {
                console.log(err)
            }
        },
    }
}