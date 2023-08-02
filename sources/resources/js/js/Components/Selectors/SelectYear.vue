<template>
    <TypeHead
        preload
        v-bind="$attrs"
        class="form-control p-0"
        toggle-class="border-0"
        v-model="model"
        @update:modelValue="item=>$emit('update:modelValue',item?.value)"
        toggle-size="sm"
        :get-label="item => (item?.text || $t('general.select_year'))"
        :get-option="item => item.text"
        :get-items="getItems"
    />
</template>

<script lang="ts" setup>
import {TypeHead} from "@wovosoft/wovoui";
import {PropType, ref, watch} from "vue";
import dayjs from "dayjs";

const props = defineProps({
    state: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    modelValue: {
        default: null
    }
});

const model = ref();
const years = [...Array(dayjs().year() - 1971 + 1).keys()].map(i => i + 1971);

watch(() => props.modelValue, value => {
    model.value = value ? {
        value: value,
        text: value
    } : null
}, {immediate: true})

function getItems(items, query) {
    if (query.value) {
        items.value = years
            .filter(year => year.toString().includes(query.value.toLowerCase()))
            .map(i => ({
                text: i,
                value: i
            }))
    } else {
        items.value = years.map(i => ({
            text: i,
            value: i
        }));
    }
}
</script>

