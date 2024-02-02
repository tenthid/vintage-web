<template>
    <div>
        <label class="fw-semibold"> 
            {{ label }} <span style="color: #cb3a31" >*</span>
            <!-- <input :type="type" :class="[{ 'd-block': isImage }, 'form-control' ]" class="d-none"> -->
        </label>
        <input
        :class="[{ 'd-none': isPassword}, 'form-control' ]" 
        :type="type"
        :placeholder="placeholder" 
        :readonly="readonly === '1'"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @keyup="$emit('keyInput', $event.target.value)"
        @focus="$emit('totalTimeFocus', $event.target.value)"/>

        <!-- if input use show control password-->
        <div class="input-group" :class="isPassword? 'd-flex' : 'd-none'">
            <input
            class="form-control border-end-0" 
            :type="passIcon?'text' : 'password'"
            :id="identity" 
            :placeholder="placeholder" 
            :readonly="readonly === '1'"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            @keyup="$emit('keyInput', $event.target.value)"
            @focus="$emit('totalTimeFocus', $event.target.value)"/>
            <span class="input-group-text bg-white "><i style="cursor: pointer;" @click="passIconControl()" :class="passIcon? ['fa-solid fa-eye-slash'] : ['fa-solid fa-eye']"></i></span>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    defineProps({
        type: { type: String, require: true },
        label: { type: String, require: true },
        identity: { type: String, require: true,},
        placeholder: { type: String, require: false },
        readonly: { type: String, require: true, default: "0" },
        isPassword: { type: Boolean, require: true, default: false },
        modelValue: {type: [String, Number]}
    })

    const passIcon = ref(false)

    const passIconControl = () => {
        passIcon.value = !passIcon.value 
    }
</script>

<style>
    
</style>