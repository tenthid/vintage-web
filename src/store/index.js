import { createStore } from "vuex";
import product from "./product";

export const store = createStore({
    modules: {
        product,
    },
})