import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";


export default {
    namespaced: true,
    state () {
        return {
            authApi: 'https://identitytoolkit.googleapis.com/v1/accounts:',
            apiKey: 'AIzaSyAtGzsOA_3SpBii43hp81-niux0gAIs3Pk',
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
                const { data } = await axios.post(`${state.authApi}signUp?key=${state.apiKey}`, userData)
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
                    address: '',
                }
                await dispatch('addUser', addUserData)
                return false
            } catch(err) {
                console.log(err)
                return true
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
                returnSecureToken: true,
            }
            try {
                const { data } = await axios.post(`${state.authApi}signInWithPassword?key=${state.apiKey}`, userData)
                console.log(new Date(Date.now() + parseInt(data.expiresIn)))
                commit("setToken", {    
                    idToken: data.idToken,
                    expiresIn: new Date().getTime() + Number.parseInt(data.expiresIn) * 1000
                })
                await dispatch('getUser', data.localId)
                return false
            } catch(err) {
                console.log(err)
                return true
            }
        },
        async sendOobVerify({state}, payload) {
            const token = Cookies.get('token')
            const UID = Cookies.get('UID')
            console.log(payload)
            try {
                const { data } = await axios.post(`${state.authApi}sendOobCode?key=${state.apiKey}`,{
                    requestType: "VERIFY_AND_CHANGE_EMAIL",
                    idToken: token,
                    email: state.userData.email,
                    newEmail: payload,
                    // continueUrl: 'https://tenthid-vintage.netlify.app/profile?change=true'
                    // localId: [UID],
                    // returnOobLink: true
                })
                console.log(data)
                return false
            } catch(err) {
                console.log(err.response.request.responseText)
                return true
            }
        },
        async updateUserEmail({ dispatch, state}, payload) {
            const userData = {   
                idToken: state.token,
                email: payload.email,
                returnSecureToken: true
            }
            try {
                const { data } = await axios.post(`${state.authApi}update?key=${state.apiKey}`, userData)
                await dispatch('updateUserProfie', payload)
                return false
            } catch(err) {
                console.log(err)
                return true
            }
        },
        async updateUserProfie({ state, dispatch }, payload) {
            const userData = {
                fullname: payload.fullname,
                username: payload.username, 
                email: payload.email,
                image: payload.image,
                likedList: payload.likedList,
                cart: payload.cart,
                buyHistory: payload.buyHistory,
                userId: payload.userId,
                address: payload.address
            }
            try {
                const { data } = await axios.put(`${state.rtdbLink}users/${state.userKey}.json?auth=${state.token}`, userData)
                dispatch('getUser', userData.userId)
            } catch(err) {
                console.log(err)
            }
        },
        async changeUserPassword({ state },payload) {
            const userData = {
                newPassword: payload.newPassword,
                oldPassword: payload.oldPassword,
                email: state.userData.email
            }
            console.log(userData)
            try {
                const { data } = await axios.post(`${state.authApi}resetPassword?key=${state.apiKey}`, userData)
                console.log(data)
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
        async updateUserLike ({ state }, payload) {
            try {
                const { data } = await axios.put(`${state.rtdbLink}users/${state.userKey}/likedList.json`, payload) 
            } catch(err) {
                console.log(err)
            }
        }
    }
}