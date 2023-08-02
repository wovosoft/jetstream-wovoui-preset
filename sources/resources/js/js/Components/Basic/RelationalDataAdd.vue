<template>
    <Flex jc="between">
        <FlexItem>
            <h4>{{ title }}</h4>
        </FlexItem>
        <FlexItem>
            <form @submit.prevent="handleSubmission">
                <InputGroup size="sm">
                    <slot/>
                    <template #append>
                        <Button variant="dark" type="submit">
                            <Spinner v-if="processing" size="sm"/>
                            Add
                        </Button>
                    </template>
                </InputGroup>
            </form>
        </FlexItem>
    </Flex>
</template>

<script lang="ts" setup>
import {Button, Flex, FlexItem, InputGroup, Spinner} from "@wovosoft/wovoui";
import {PropType, ref} from "vue";
import route from "ziggy-js";
import {addToast} from "@/Composables/useToasts";
import {useForm} from "@inertiajs/vue3";

const props = defineProps({
    title: String as PropType<string>,
    /**
     * Route Name
     */
    submitTo: String as PropType<string>,
    /**
     * Route Parameters
     */
    modelValue: {
        type: Object,
        default: () => ({})
    }
});

const processing = ref<boolean>(false);

function handleSubmission() {
    let keys = Object.keys(props.modelValue);
    for (let key of keys) {
        if (!props.modelValue[key]) {
            return;
        }
    }
    processing.value = true;

    useForm({}).put(route(props.submitTo, props.modelValue), {
        onSuccess: (page) => {
            addToast(page.props.notification);
        },
        onError: (errors) => {
            console.log(errors)
        },
        onFinish: () => {
            processing.value = false
        }
    });
}
</script>

