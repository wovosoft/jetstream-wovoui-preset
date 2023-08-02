<template>
    <InputGroup size="sm">
        <TypeHead
            :preload="preload"
            v-bind="$attrs"
            class="form-control p-0"
            toggle-class="border-0"
            v-model="model"
            @update:modelValue="item=>$emit('update:modelValue',item?.id)"
            toggle-size="sm"
            :get-option="op => [op.name, `(${op?.code})`].join(' ')"
            :api-url="route('offices.options',{type:Array.isArray(type)?type.join('|'):type})">
            <template #label>
                {{ model ? [model.name, `(${model?.code})`].join(' ') : $t('general.select_office') }}
            </template>
        </TypeHead>
        <Button @click="$emit('update:modelValue',null)">
            <X/>
        </Button>
    </InputGroup>
</template>

<script lang="ts" setup>
import {Button, InputGroup, TypeHead} from "@wovosoft/wovoui";
import {PropType, ref, watch} from "vue";
import route from "ziggy-js";
import {OfficeTypes} from "@/types";
import {X} from "@wovosoft/wovoui-icons";

const props = defineProps({
    state: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    modelValue: {
        default: null
    },
    office: {
        default: null
    },
    type: {
        type: [String, Array] as PropType<OfficeTypes | OfficeTypes[] | null>,
        default: null
    },
    preload: {
        type: Boolean as PropType<boolean>,
        default: true
    }
});

const model = ref(null);

watch(() => props.office, value => {
    model.value = value;
}, {immediate: true});

watch(() => props.modelValue, value => {
    if (!value) {
        model.value = null;
    }
});
</script>

