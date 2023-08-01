<template>
    <form @submit.prevent="handleBasicSubmission">
        <Row>
            <Col :md="6" :sm="12" v-for="field in basicFields">
                <FormGroup horizontal :content-md="8" :label-md="4">
                    <template #label>
                        {{ toTitle(field['label'] || field.key) }}
                        <span class="text-danger" v-if="field?.attrs?.['required']">
                            *
                        </span>
                    </template>
                    <component
                        :class="{'is-invalid':!!basic.errors[field.key]}"
                        :is="field.component"
                        v-bind="field.attrs"
                        v-model="basic[field.key]">
                        {{ field.component['__name'] === 'Checkbox' ? toTitle(field.key) : null }}
                    </component>
                    <Feedback :message="basic.errors[field.key]" type="invalid"/>
                    <div class="form-text" v-if="field['hint']">
                        {{ field?.['hint']}}
                    </div>
                </FormGroup>
            </Col>
            <Col :md="3" :sm="12" :offset-md="3">
                <ButtonGroup size="sm" justified>
                    <Button v-if="basic.hasErrors" @click="basic.clearErrors()" variant="dark">
                        Clear Errors
                    </Button>
                    <Button type="submit" size="sm" variant="primary" :disabled="basic.processing">
                        <Spinner size="sm" v-if="basic.processing"/>
                        {{ item.id ? 'Update' : 'Save' }}
                    </Button>
                </ButtonGroup>
            </Col>
        </Row>
    </form>
</template>

<script setup lang="ts">
import {$reset, $set, callBackOptions, toTitle} from "@/Composables/useHelpers";
import {ButtonGroup, Feedback, FormGroup, Row, Spinner, Col, Button} from "@wovosoft/wovoui";
import usePersons, {basicKeys, initialBasic} from "@/Composables/usePersons";
import {useForm} from "@inertiajs/vue3";
import route from "ziggy-js";
import {PropType, watch} from "vue";

const basic = useForm(JSON.parse(JSON.stringify(initialBasic)));
const {basicFields} = usePersons(basic);

const props = defineProps({
    item: Object as PropType<TPerson>,
    isModalShown: Boolean as PropType<boolean>
});

const emit = defineEmits<{
    (e: 'update:item', value: any): void
    (e: 'success', value: any): void
}>();

function setItem(person = null) {
    if (person?.id) {
        //on edit
        $set(basic, JSON.parse(JSON.stringify(person)), basicKeys);
    } else {
        let index = basicKeys.indexOf('is_my_client');

        delete basicKeys[index];
        $reset(basic, basicKeys.filter(i => !!i), null);
        basic.nationality1 = "BD";
        basic.residence = "BD";
        basic.title = "Mr.";
        basic.gender = "M";
    }
}

watch(() => props.isModalShown, isShown => {
    if (!isShown) {
        basic.reset();
    }
});

watch(props.item, person => {
    setItem(person)
}, {deep: true, immediate: true})

function handleBasicSubmission() {
    const cb = callBackOptions((page) => {
        setItem(page.props.notification.item);
        emit("update:item", page.props.notification.item);
        emit("success", true);
    });

    [
        'last_name',
        'fathers_name',
        'mothers_name',
        'spouse_name',
        'employer_name',
        'comments',
    ].forEach((name: string) => {
        basic[name] = basic[name]?.replace(/ +(?= )/g, '').trim();
    });

    if (basic['id']) {
        basic.patch(route("my-persons.update.basic", {person: Number(basic['id'])}), cb);
    } else {
        basic.put(route("my-persons.store.basic"), cb);
    }
}
</script>
