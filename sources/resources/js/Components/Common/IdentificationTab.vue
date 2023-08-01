<script setup lang="ts">

import {$set, toTitle} from "@/Composables/useHelpers";
import {Card, DataTable, Feedback, Col, Button, FormGroup, Row, Spinner} from "@wovosoft/wovoui";
import ActionButtons from "@/Components/Common/ActionButtons.vue";
import {router, useForm} from "@inertiajs/vue3";
import route from "ziggy-js";
import usePersons, {identificationKeys, initialIdentification} from "@/Composables/usePersons";
import {useI18n} from "vue-i18n";
import {addToast} from "@/Composables/useToasts";
import {PropType} from "vue";

const props = defineProps({
    item: Object as PropType<TPerson>,
    storeUrl: String as PropType<string>,
    deleteRoute: String as PropType<string>,
});

const emit = defineEmits<{
    (e: "update:item", value: any): void
}>();

const {
    identificationComponents,
    identificationFields
} = usePersons();

const {t} = useI18n();
const identification = useForm(JSON.parse(JSON.stringify(initialIdentification)));

const callBackOptions = (callback = null) => ({
    onSuccess: (page) => {
        emit("update:item", page.props.notification.item);
        addToast(page.props.notification);

        if (typeof callback === "function") {
            callback(page);
        }
    },
    onError: (err) => console.log(err)
});

function deleteIdentification(item) {
    if (confirm(t('general.are_you_sure'))) {
        router.delete(
            route(props.deleteRoute, item.id),
            callBackOptions()
        );
    }
}

function handleIdentificationSubmission() {
    const cbOptions = callBackOptions((page) => {
        identification.reset();
        // nextTick(() => tabIndex.value++);
    });

    if (identification && identification['id']) {
        identification.patch(
            route("my-persons.update.identification", {
                person: Number(props.item['id']),
                identification: Number(identification['id'])
            }),
            cbOptions
        );
    } else {
        identification.put(
            route("my-persons.store.identification", props.item['id']),
            cbOptions
        );
    }
}

function setIdentification(item) {
    $set(identification, item, identificationKeys);
    if (!item.id) {
        identification.country = "BD";
    }
}
</script>

<template>
    <form @submit.prevent="handleIdentificationSubmission">
        <Row>
            <Col :md="8" :sm="12">
                <DataTable
                    small
                    bordered
                    head-class="table-dark"
                    :fields="identificationFields"
                    :items="item?.identifications||[]">
                    <template #cell(action)="row">
                        <ActionButtons
                            @click:edit="setIdentification(row.item)"
                            @click:delete="deleteIdentification(row.item)"
                            no-view/>
                    </template>
                </DataTable>
            </Col>
            <Col :md="4" :sm="12">
                <Card>
                    <FormGroup
                        horizontal
                        :content-md="8"
                        :label-md="4"
                        v-for="(field,field_key) in identificationComponents" :key="field_key">
                        <template #label>
                            {{ toTitle(field.key) }}
                            <span class="text-danger" v-if="field?.attrs?.required">
                                *
                            </span>
                        </template>
                        <component
                            :class="{'is-invalid':!!identification.errors[field.key]}"
                            :is="field.component"
                            v-bind="field['attrs']"
                            v-model="identification[field.key]"
                        />
                        <Feedback :message="identification.errors[field.key]" type="invalid"/>
                    </FormGroup>
                    <template #footer>
                        <Button block type="submit"
                                size="sm"
                                variant="primary"
                                :disabled="identification.processing">
                            <Spinner size="sm" v-if="identification.processing"/>
                            {{ $t(identification.id ? 'general.update' : 'general.save') }}
                        </Button>
                    </template>
                </Card>
            </Col>
        </Row>
    </form>
</template>
