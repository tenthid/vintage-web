import axios from "axios"

export default {
    namespaced: true,
    state () {
        return {
            products: []
        }
    },

    getters: {

    },

    mutations: {
        setProductData(state, payload) {
            state.products = payload
        }
    },

    actions: {
        async getProductData({commit}) {
            try {
                const { data } = await axios.get('https://vue-js-project-67129-default-rtdb.firebaseio.com/products.json')
                commit('setProductData', data)
            } catch(err) {
                console.log(err)
            }
        }
    }
}