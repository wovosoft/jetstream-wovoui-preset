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
            :get-label="item => (item?.text || $t('general.select_occupation'))"
            :get-option="item => item.text"
            :get-items="getItems"
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
import {getOccupation, occupations} from "@/Options";
import {X} from "@wovosoft/wovoui-icons";

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

watch(() => props.modelValue, value => {
    model.value = getOccupation(value);
}, {immediate: true})

function getItems(items, query) {
    if (query.value) {
        items.value = occupations.filter(country => {
            return country.text.toLowerCase().includes(query.value.toLowerCase())
        });
    } else {
        items.value = occupations;
    }
}

</script>

