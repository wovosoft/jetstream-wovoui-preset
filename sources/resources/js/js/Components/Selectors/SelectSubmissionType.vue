<template>
    <RadioGroup
        inline
        :model-value="modelValue"
        @update:modelValue="code=>$emit('update:modelValue',code)"
        text-field="text"
        value-field="value"
        :options="submissionTypes"
    />
</template>

<script lang="ts" setup>
import {RadioGroup} from "@wovosoft/wovoui";
import {PropType} from "vue";
import {submissionTypes} from "@/Options";

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

