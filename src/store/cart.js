import axios from "axios"
// import { store } from "."

export default {
    namespaced: true,
    state () {
        return {
            cartItems: [],
            buyHistory: [],
            rebuyItems: []
        }
    },

    getters: {

    },

    mutations: {
        setCartItems(state, payload) {
            state.cartItems = payload
        },
        setBuyHistory(state, payload) {
            state.buyHistory = payload
        },
        setRebuyItems(state, payload) {
            state.rebuyItems = payload
        }
    },

    actions: {
        async updateCartItems( { rootState, dispatch }, payload ) {
            try {
                const { data } = await axios.put(`${rootState.auth.rtdbLink}users/${rootState.auth.userKey}/cart.json`, payload)
                await dispatch('getCartItems')
                // commit('setCartItems', rootState.auth.userData.cart)
            } catch(err) {
                console.log(err)
            }
        },
        async getCartItems({ commit, rootState }) {
            try {
                const { data } = await axios.get(`${rootState.auth.rtdbLink}users/${rootState.auth.userKey}/cart.json`)
                commit('setCartItems', data)
            } catch(err) {
                console.log(err)
            }
        },
        async getBuyHistory({ commit, rootState }) {
            try {
                const { data } = await axios.get(`${rootState.auth.rtdbLink}users/${rootState.auth.userKey}/buyHistory.json`)
                commit('setBuyHistory', data)
            } catch(err) {
                console.log(err)
            }
        }, 
        async addNewTransactionHistory({rootState}, payload) {
            try {
                const { data } = await axios.put(`${rootState.auth.rtdbLink}users/${rootState.auth.userKey}/buyHistory.json`, payload)
            } catch(err) {
                console.log(err)
            }
        },
        async emptyCart({rootState}) {
            const { data } = await axios.delete(`${rootState.auth.rtdbLink}users/${rootState.auth.userKey}/cart.json`)
        },
        async getRebuyItems({rootState, commit}, payload) {
            try {
                const { data } = await axios.get(`${rootState.auth.rtdbLink}users/${rootState.auth.userKey}/buyHistory/${payload}.json`)
                commit('setRebuyItems', data.items)
            } catch {

            }
        }
    }
}