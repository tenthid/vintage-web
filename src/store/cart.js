import axios from "axios"

export default {
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
        async getProductData({commit}, payload) {
            try {
                const { data } = await axios.get()
            } catch(err) {
                console.log(err)
            }
        }
    }
}