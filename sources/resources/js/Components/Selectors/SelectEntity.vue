<template>
    <InputGroup size="sm">
        <TypeHead
            preload
            v-bind="$attrs"
            class="form-control p-0"
            toggle-class="border-0"
            v-model="localModel"
            @update:model-value="model=localModel?.id"
            toggle-size="sm"
            :get-option="item => item?.name"
            :api-url="route('my-entities.options')">
            <template #label>
                {{ localModel?.name || $t('general.select_entity') }}
            </template>
        </TypeHead>
        <Button @click="()=>{
            localModel=null;
            model=null;
        }">
            <X/>
        </Button>
    </InputGroup>
</template>

<script lang="ts" setup>
import {Button, InputGroup, TypeHead} from "@wovosoft/wovoui";
import {PropType, ref, toValue, useModel} from "vue";
import route from "ziggy-js";
import {X} from "@wovosoft/wovoui-icons";

const props = defineProps({
    state: {type: Boolean as PropType<boolean>, default: false},
    modelValue: {
        type: Number as PropType<number>,
        default: null
    },
    initial: {
        type: Object as PropType<TEntity | null>,
        default: null
    }
});

const model = useModel(props, 'modelValue');
const localModel = ref<TEntity | null>(toValue(props.initial));
</script>

