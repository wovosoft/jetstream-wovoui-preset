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
            :get-label="item => (item?.text || $t('general.select_district'))"
            :get-option="item => item.text"
            :get-items="getDistricts"
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
import {districts, getDistrict} from "@/Options";
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
    model.value = getDistrict(value);
}, {immediate: true})

function getDistricts(items, query) {
    if (query.value) {
        items.value = districts.filter(district => {
            return district.text.toLowerCase().includes(query.value.toLowerCase())
        });
    } else {
        items.value = districts;
    }
}

</script>

