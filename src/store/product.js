import axios from "axios"

export default {
    namespaced: true,
    state () {
        return {
            products: [],
            productDetail: {},
        }
    },

    getters: {

    },

    mutations: {
        setProductData(state, payload) {
            state.products = payload
        },
        setProductDetail(state, payload) {
            state.productDetail = payload
        }
    },

    actions: {
        async getProductData({commit}) {
            try {
                const { data } = await axios.get('https://vue-js-project-67129-default-rtdb.firebaseio.com/products.json')
                const arr = []
                const productData = []
                for( let key in data ) {
                    arr[key] = {...data[key], isLike: false}
                    productData.push({id: key, ...arr[key]})
                    // arr.push({id:key, ...data[key]})
                }
                commit('setProductData', productData)
            } catch(err) {
                console.log(err)
            }
        },
        async getProductDetail({commit}, payload) {
            try {
                const { data } = await axios.get(`https://vue-js-project-67129-default-rtdb.firebaseio.com/products/${payload}.json`)
                commit('setProductDetail', data)
            } catch(err) {
                console.log(err)
            }
        }
    }
}