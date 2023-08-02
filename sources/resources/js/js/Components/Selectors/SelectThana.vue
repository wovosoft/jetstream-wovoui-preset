<template>
    <InputGroup size="sm">
        <TypeHead
            preload
            v-bind="$attrs"
            class="form-control p-0"
            toggle-class="border-0"
            v-model="model"
            @update:modelValue="item=>$emit('update:modelValue',item?.value)"
            toggle-size="sm"
            :get-label="item => (item?.text || $t('general.select_thana'))"
            :get-option="item => item.text"
            :get-items="getThanas"
        />
        <template #append>
            <Button variant="dark" @click="$emit('update:modelValue',null)">
                <X/>
            </Button>
        </template>
    </InputGroup>
</template>

<script lang="ts" setup>
import {Button, InputGroup, TypeHead} from "@wovosoft/wovoui";
import {PropType, ref, watch} from "vue";
import {getThana, thanas} from "@/Options";
import {X} from "@wovosoft/wovoui-icons";


const props = defineProps({
    state: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    modelValue: {
        default: null
    },
});

const model = ref();

watch(() => props.modelValue, value => {
    model.value = getThana(value);
}, {immediate: true})

function getThanas(items, query) {
    if (query.value) {
        items.value = thanas.filter(country => {
            return country.text.toLowerCase().includes(query.value.toLowerCase())
        });
    } else {
        items.value = thanas;
    }
}

</script>

