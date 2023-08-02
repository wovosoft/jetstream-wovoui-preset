<template>
    <RadioGroup
        inline
        :model-value="modelValue"
        @update:modelValue="report=>$emit('update:modelValue',report)"
        text-field="text"
        value-field="value"
        :options="reportCodes"
    />
</template>

<script lang="ts" setup>
import {RadioGroup} from "@wovosoft/wovoui";
import {PropType} from "vue";
import {reportCodes} from "@/Options";

const props = defineProps({
    state: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    modelValue: {
        default: null
    }
});
</script>

