<template>
    <Select
        :model-value="modelValue"
        @update:modelValue="month=>$emit('update:modelValue',month)"
        text-field="text"
        value-field="value"
        :options="months.map((i,k)=>({text:i,value:(k+1)}))"
    />
</template>

<script lang="ts" setup>
import {Select} from "@wovosoft/wovoui";
import {PropType} from "vue";

const props = defineProps({
    state: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    modelValue: {
        default: null
    }
});

const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];
</script>

