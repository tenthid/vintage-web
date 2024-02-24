import axios from "axios"
import { ref } from "vue"

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
            // console.log('get data')
            try {
                const { data } = await axios.get('https://vue-js-project-67129-default-rtdb.firebaseio.com/products.json')
                const productData = []
                // const i = ref(0)
                // const userLikedProduct = rootState.auth.userData.likedList
                // console.log(userLikedProduct)
                for( let key in data ) {
                    productData.push({id: key, ...data[key]})
                    // i.value++
                    // if (key === userLikedProduct[i].id) {
                    //     productData[i].isLike = true
                    // } else {
                    //     productData[i].isLike = true
                    // }
                }
                const totalRateTemp = ref(0)
                for( let i = 0; i < productData.length; i++ ) {
                    const rateInProduct = productData[i].rate;
                    totalRateTemp.value = 0
                    for( let key in rateInProduct ) {
                        totalRateTemp.value += rateInProduct[key]
                    }
                    productData[i].totalRate = totalRateTemp.value
                }
                commit('setProductData', productData)
            } catch(err) {
                console.log(err)
            }
        },
        async getProductDetail({commit, rootState}, payload) {
            try {
                const { data } = await axios.get(`https://vue-js-project-67129-default-rtdb.firebaseio.com/products/${payload}.json`)
                for (let key in data.rate) {
                    if (key === rootState.auth.userKey) {
                        data.userRate = data.rate[key]
                    } else {
                        data.userRate = 0
                    }
                }
                commit('setProductDetail', data)
            } catch(err) {
                console.log(err)
            }
        },
        async addRate({ state, rootState }, payload) {
            const userKey = rootState.auth.userKey
            // console.log(payload)
            try {
                const { data } = await axios.put(`${rootState.auth.rtdbLink}products/${payload.productId}/rate/${userKey}.json`, payload.rate)
                // if ( isUserRate ) {
                //     const { data } = await axios.put(`${rootState.auth.rtdbLink}products/${payload.productId}/rate/${userKey}.json`, payload.rate)
                //     console.log(data, 'this put')
                // } else {
                //     const { data } = await axios.post(`${rootState.auth.rtdbLink}products/${payload.productId}/rate/${userKey}.json`)
                //     console.log(data, 'this post')
                // }
            } catch(err) {
                console.log(err)
            }
        },
        async updateLikeCount({ rootState }, payload) {
            try {
                const { data } = await axios.put(`${rootState.auth.rtdbLink}products/${payload.id}/likeCount.json`, payload.count)
            } catch(err) {
                console.log(err)
            }
        }
    }
}