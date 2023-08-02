<template>
    <InputGroup size="sm">
        <TypeHead
            preload
            v-bind="$attrs"
            class="form-control p-0"
            toggle-class="border-0"
            v-model="state"
            toggle-size="sm"
            :get-option="(op:TPerson) => getLabel(op)"
            :get-items="getItems">
            <template #label>
                {{ getLabel(state || person) }}
            </template>
        </TypeHead>
        <Button @click="state=null">
            <X/>
        </Button>
    </InputGroup>
</template>

<script lang="ts" setup>
import {Button, InputGroup, TypeHead} from "@wovosoft/wovoui";
import {computed, PropType, Ref, ref, toValue} from "vue";
import route from "ziggy-js";
import {X} from "@wovosoft/wovoui-icons";
import {isNil} from "lodash";
import {useI18n} from "vue-i18n";
import axios from "axios";
import isEmpty from "lodash/isEmpty";

const {t} = useI18n();
const props = defineProps({
    modelValue: {
        type: Number as PropType<number>,
        default: null
    },
    person: {
        type: Object as PropType<TPerson>,
        default: null
    },
    accountId: {
        type: Number as PropType<number>,
        default: null
    },
    items: {
        type: Array as PropType<TPerson[] | null>,
        default: () => null
    }
});

const emit = defineEmits<{
    "update:modelValue": [value: number]
}>();

const query = ref<string>();

const model = ref<TPerson | null>(toValue(props.person));

const state = computed({
    get: () => model.value,
    set: (value: TPerson | null) => {
        model.value = value;
        emit('update:modelValue', value?.id || null);
    }
});


function getLabel(person: TPerson | null) {

    if (isNil(toValue(person))) {
        return t('general.select_person');
    }

    return [
        person.first_name,
        person.last_name,
        `(${(person.ssn || person.passport_number || person.id_number)})`
    ].join(' ');
}

const getItems = (items: Ref<TPerson[]>, query: Ref<string | null>) => {
    if (props.items && !isEmpty(props.items)) {
        items.value = props.items;
        return;
    }

    axios.post(route('my-persons.options', {account_id: props.accountId, query: query.value}))
        .then(res => {
            items.value = res.data;
        })
        .catch(err => {
            items.value = [];
        })
};
</script>

