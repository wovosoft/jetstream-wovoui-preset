<template>
    <InputGroup size="sm">
        <TypeHead
            preload
            v-bind="$attrs"
            class="form-control p-0"
            toggle-class="border-0"
            v-model="model"
            toggle-size="sm"
            :get-label="item => item?(`${item?.text} (${item?.value})`): $t('general.select_currency')"
            :get-option="item => `${item?.text} (${item?.value})`"
            :get-items="getItems"
        />
        <Button @click="model=null">
            <X/>
        </Button>
    </InputGroup>
</template>

<script lang="ts" setup>
import {Button, InputGroup, TypeHead} from "@wovosoft/wovoui";
import {computed, PropType} from "vue";
import {currencies, getCurrency} from "@/Options";
import {X} from "@wovosoft/wovoui-icons";

const props = defineProps({
    state: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    modelValue: {
        default: () => null
    }
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: string)
}>();


const model = computed({
    get: () => getCurrency(props.modelValue),
    set: (currency) => emit('update:modelValue', currency?.value)
});

function getItems(items, query) {
    if (query.value) {
        items.value = currencies.filter(country => {
            return country.text.toLowerCase().includes(query.value.toLowerCase()) || country.value.toLowerCase().includes(query.value.toLowerCase())
        });
    } else {
        items.value = currencies;
    }
}

</script>

