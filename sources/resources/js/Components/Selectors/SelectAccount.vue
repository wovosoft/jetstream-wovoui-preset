<template>
    <InputGroup size="sm" class="select-accounts">
        <TypeHead
            menu-class="min-width-300"
            :preload="preload"
            v-bind="$attrs"
            class="form-control p-0"
            toggle-class="border-0"
            v-model="model"
            @update:modelValue="item=>{
                $emit('update:modelValue',item?.id);
                $emit('selected',item);
            }"
            toggle-size="sm"
            :get-option="op => [op.account, `(${op.account_name})`].join(' ')"
            :get-items="getItems">
            <template #label>
                {{ model ? [model.account_name, `(${model?.account})`].join(' ') : $t('general.select_account') }}
            </template>
        </TypeHead>
        <Button @click="()=>{
            $emit('update:modelValue',null);
            $emit('selected',null)
        }">
            <X/>
        </Button>
    </InputGroup>
</template>

<script lang="ts" setup>
import {Button, InputGroup, TypeHead} from "@wovosoft/wovoui";
import {PropType, ref, watch, Ref} from "vue";
import route from "ziggy-js";
import {X} from "@wovosoft/wovoui-icons";
import axios from "axios";

const props = defineProps({
    state: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    modelValue: {
        default: null
    },
    account: {
        default: null
    },
    preload: {
        type: Boolean as PropType<boolean>,
        default: true
    }
});

const emit = defineEmits<{
    'update:modelValue': [value: number | null],
    'selected': [value: TAccount | null]
}>();

const model = ref<TAccount | null>();

watch(() => props.account, value => {
    model.value = value;
}, {immediate: true});

watch(() => props.modelValue, value => {
    if (!value) {
        model.value = null;
    }
});
const getItems = (items: Ref<TAccount[]>, query: Ref<string | null>) => {
    axios.post(route('my-accounts.options', {query: query.value}))
        .then(res => {
            items.value = res.data;
        })
}
</script>
<style>
.select-accounts .dropdown-menu {
    min-width: 350px !important;
}
</style>

