<template>
    <Row>
        <Col :md="8" :sm="12">
            <DataTable
                small
                bordered
                head-class="table-dark"
                :items="item.phones"
                :fields="phoneFields">
                <template #cell(action)="row">
                    <ActionButtons
                        no-view
                        :no-edit="!can(Permissions.UPDATE_PERSON_PHONE)"
                        :no-delete="!can(Permissions.DELETE_PERSON_PHONE)"
                        @click:edit="()=>$set(phone, row.item,[
                            'id','tph_contact_type','tph_communication_type',
                            'tph_country_prefix','tph_number','tph_extension', 'comments'
                        ])"
                        @click:delete="()=>trashPhone(row.item.id)"
                    />
                </template>
            </DataTable>
            <!--<pre>{{ phone }}</pre>-->
        </Col>
        <Col :md="4" :sm="12">
            <form class="card" @submit.prevent="handlePhoneSubmission">
                <div class="card-body">
                    <template v-for="field in phoneComponents">
                        <FormGroup>
                            <template #label>
                                {{ toTitle(field.label || field.key) }}
                                <span class="text-danger" v-if="field?.attrs?.required">*</span>
                            </template>
                            <component
                                :class="{'is-invalid':!!phone.errors[field.key]}"
                                :is="field.component"
                                v-bind="field.attrs"
                                v-model="phone[field.key]"
                            />
                            <Feedback :message="phone.errors[field.key]" type="invalid"/>
                        </FormGroup>
                    </template>
                </div>
                <div class="card-footer text-end">
                    <ButtonGroup size="sm" justified>
                        <Button variant="primary" type="submit"
                                :disabled="phone.processing || !shouldSubmit">
                            <Spinner v-if="phone.processing" size="sm"/>
                            Submit
                        </Button>
                        <Button variant="danger" @click="phone.reset()">
                            Reset
                        </Button>
                    </ButtonGroup>
                </div>
            </form>
        </Col>
    </Row>
</template>

<script lang="ts" setup>
import {
    Row, Col, ButtonGroup, Button, FormGroup, DataTable, Spinner, Feedback
} from "@wovosoft/wovoui";

import {$set} from "@/Composables/useHelpers";
import route from "ziggy-js";
import {router, useForm} from "@inertiajs/vue3";
import {addToast} from "@/Composables/useToasts";
import usePersons, {initialPhone} from "@/Composables/usePersons";
import {toTitle} from "@/Composables/useHelpers";
import {computed, onBeforeMount, PropType} from "vue";
import ActionButtons from "@/Components/Common/ActionButtons.vue";
import {can} from "@/Composables/usePermissions";
import Permissions from "@/Composables/thePermissions";

const {phoneFields, phoneComponents} = usePersons();

const phone = useForm(JSON.parse(JSON.stringify(initialPhone)));
onBeforeMount(() => phone.reset());

const shouldSubmit = computed<boolean>(() => !!(phone?.tph_contact_type && phone?.tph_communication_type && phone?.tph_country_prefix && phone?.tph_number));

const props = defineProps({
    item: Object as PropType<TPerson | TEntity>,
    storeUrl: String as PropType<string>,
    deleteRoute: String as PropType<string>,
});

const emit = defineEmits<{
    (e: "update:item", value: any): void
}>();

function handlePhoneSubmission() {
    phone.put(
        props.storeUrl,
        callBackOptions(() => phone.reset())
    );
}

function trashPhone(id: number) {
    if (confirm("Are You Sure?")) {
        router.delete(route(props.deleteRoute, {
            phone: id,
            [props.item.hasOwnProperty('directors') ? 'entity' : 'person']: props.item.id,
        }), callBackOptions())
    }
}

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
</script>

