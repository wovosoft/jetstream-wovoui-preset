<template>
    <Row>
        <Col :md="8" :sm="12">
            <DataTable
                small
                bordered
                head-class="table-dark"
                :items="item.addresses"
                :fields="addressFields">
                <template #cell(action)="row">
                    <ActionButtons
                        no-view
                        :no-edit="!can(Permissions.UPDATE_PERSON_ADDRESS)"
                        :no-delete="!can(Permissions.DELETE_PERSON_ADDRESS)"
                        @click:delete="deleteAddress(row.item.id)"
                        @click:edit="setAddress(row.item)"
                    />
                </template>
            </DataTable>
        </Col>
        <Col :md="4" :sm="12">
            <form class="card" @submit.prevent="handleAddressSubmission" ref="addressForm">
                <div class="card-body">
                    <template v-for="ac of addressComponents">
                        <FormGroup horizontal :content-md="8" :label-md="4">
                            <template #label>
                                {{ toTitle(ac?.['label'] || ac.key) }}
                                <span class="text-danger" v-if="ac?.attrs?.required">*</span>
                            </template>
                            <component
                                :class="{'is-invalid':!!address.errors[ac.key]}"
                                :is="ac.component"
                                v-bind="ac.attrs"
                                v-model="address[ac.key]"
                            />
                            <Feedback :message="address.errors[ac.key]" type="invalid"/>
                        </FormGroup>
                    </template>
                </div>
                <div class="card-footer text-end">
                    <ButtonGroup size="sm" justified>
                        <Button variant="primary" type="submit"
                                :disabled="address.processing || !shouldSubmit">
                            <Spinner v-if="address.processing" size="sm"/>
                            Submit
                        </Button>
                        <Button variant="danger" @click="address.reset()">
                            Reset
                        </Button>
                    </ButtonGroup>
                </div>
            </form>
        </Col>
    </Row>
</template>

<script lang="ts" setup>
import {Row, Col, ButtonGroup, Button, Spinner, FormGroup, DataTable, Feedback} from "@wovosoft/wovoui";
import {router, useForm} from "@inertiajs/vue3";
import {computed, onBeforeMount, PropType, ref} from "vue";
import route from "ziggy-js";
import {addToast} from "@/Composables/useToasts";
import usePersons, {initialAddress} from "@/Composables/usePersons";
import {$set, toTitle} from "@/Composables/useHelpers";
import ActionButtons from "@/Components/Common/ActionButtons.vue";
import {can} from "@/Composables/usePermissions";
import Permissions from "@/Composables/thePermissions";

const {addressComponents, addressFields} = usePersons();
const props = defineProps({
    item: Object as PropType<TPerson | TEntity>,
    storeUrl: String as PropType<string>,
    deleteRoute: String as PropType<string>,
});

const emit = defineEmits<{
    (e: "update:item", value: any): void
}>();

const address = useForm(JSON.parse(JSON.stringify(initialAddress)));

onBeforeMount(() => address.reset());

const addressForm = ref<HTMLFormElement>();

function handleAddressSubmission() {
    if (addressForm.value?.reportValidity()) {
        address.put(
            props.storeUrl,
            callBackOptions(() => address.reset())
        );
    }
}

const shouldSubmit = computed<boolean>(() => !!(address?.address_type && address?.address));

function setAddress(item) {
    if (item.id) {
        $set(address, item, Object.keys(initialAddress));
        item.country = "BD";
    } else {
        $set(address, item, Object.keys(initialAddress));
    }
}

function deleteAddress(id: number) {
    if (confirm("Are You Sure?")) {
        router.delete(route(props.deleteRoute, {
            address: id,
            [props.item.hasOwnProperty('directors') ? 'entity' : 'person']: props.item.id,
        }), callBackOptions());
    }
}

const callBackOptions = (callback = null) => ({
    onSuccess: (page) => {
        if (page.props.notification['original']) {
            emit("update:item", page.props.notification['original'].item);
            addToast(page.props.notification['original']);
        } else {
            emit("update:item", page.props.notification.item);
            addToast(page.props.notification);
        }

        if (typeof callback === "function") {
            callback(page);
        }
    },
    onError: (err) => console.log(err)
});
</script>
