import axios from "axios"
// import { store } from "."

export default {
    namespaced: true,
    state () {
        return {
            cartItems: []
        }
    },

    getters: {

    },

    mutations: {
        setCartItems(state, payload) {
            state.cartItems = payload
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
        async getCartItems({ commit, rootState, state }) {
            try {
                const { data } = await axios.get(`${rootState.auth.rtdbLink}users/${rootState.auth.userKey}/cart.json`)
                commit('setCartItems', data)
            } catch(err) {
                console.log(err)
            }
        }
    }
}