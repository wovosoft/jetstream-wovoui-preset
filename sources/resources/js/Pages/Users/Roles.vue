<template>
    <CrudLayout :title="title"
                :items="items"
                allow-new
                :queries="queries"
                @click:new="onEdit({id:null,name:null,permissions:[]})">
        <DataTable
            :items="items.data"
            head-class="table-secondary"
            small
            bordered
            :fields="fields">
            <template #cell(action)="row">
                <ActionButtons
                    no-view
                    @click:edit="onEdit(row.item)"
                    @click:delete="onDelete(row.item.id)"
                />
            </template>
        </DataTable>
        <Modal v-model="isShownEdit"
               :title="$t('general.role_details')"
               header-class="text-bg-dark"
               close-btn-white
               size="xl"
               lazy
               :loading="currentItem?.processing"
               :okButtonOptions="{disabled:currentItem?.processing,variant:'primary'}"
               :ok-title="$t('general.submit')"
               @ok.prevent="onSubmit"
               @hidden="onHidden"
               shrink>
            <form @submit.prevent="onSubmit" ref="theForm">
                <FormGroup :label="$t('general.name')+' *'">
                    <Input
                        :placeholder="$t('general.role_name')"
                        size="sm"
                        v-model="currentItem.name"
                        :required="true"
                    />
                </FormGroup>
                <Row>
                    <Col :md="3" :sm="12" v-for="permission in permissions">
                        <Checkbox
                            switch
                            :value="permission"
                            :unchecked-value="null"
                            v-model="currentItem.permissions">
                            {{ toTitle(permission) }}
                        </Checkbox>
                    </Col>
                </Row>
            </form>
        </Modal>
    </CrudLayout>
</template>

<script lang="ts" setup>
import {computed, PropType, ref} from "vue";
import {Datatable} from "@/types";
import {formatDateTime} from "@/Composables/useFormats";
import CrudLayout from "@/Layouts/CrudLayout.vue";
import {DataTable, Modal, FormGroup, Input, Row, Col, Checkbox} from "@wovosoft/wovoui";
import ActionButtons from "@/Components/Common/ActionButtons.vue";
import route from "ziggy-js";
import {addToast} from "@/Composables/useToasts";
import {router, useForm} from "@inertiajs/vue3";
import {$set} from "@/Composables/useHelpers";
import {toTitle} from "@/Composables/useHelpers";
import {useI18n} from "vue-i18n";

const {t} = useI18n();

const props = defineProps({
    title: {
        type: String as PropType<string>
    },
    items: {
        type: Object as PropType<Datatable<{ id: number, name: string }>>
    },
    store_url: {
        type: String as PropType<string>
    },
    delete_route: {
        type: String as PropType<string>
    },
    notification: {
        type: Object as PropType<object>
    },
    permissions: {
        type: Array,
        default: () => ([])
    },
    queries: {
        type: Object as PropType<{ [key: string]: any }>,
        default: () => ({query: null})
    }
});

const fields = computed(() => [
    {key: 'id', label: t('general.id')},
    {key: 'name', label: t('general.name')},
    {
        key: 'created_at',
        label: t('general.created_at'),
        formatter: (v, k) => formatDateTime(v[k])
    },
    {
        key: 'action',
        label: t('general.action'),
        tdClass: 'text-end',
        thClass: 'text-end',
    },
]);

const isShownEdit = ref<boolean>(false);
const currentItem = useForm({
    id: null,
    name: null,
    permissions: []
});


function onEdit(item: { [key: string]: unknown, permissions: string[] | object[] }) {
    $set(currentItem, item, ['id', 'name'])
    currentItem.permissions = [];
    item?.permissions?.forEach(function (permission) {
        if (typeof permission === "string") {
            currentItem.permissions.push(permission);
        } else if (typeof permission === "object" && !Array.isArray(permission)) {
            currentItem.permissions.push(permission.name);
        }
    });
    isShownEdit.value = true;
}

function onHidden() {
    currentItem.reset();
}

const theForm = ref<HTMLFormElement | null>();

function onSubmit() {
    if (theForm.value?.reportValidity()) {
        currentItem.put(props.store_url, {
            onSuccess: (page) => {
                addToast(page.props.notification);
                isShownEdit.value = false;
            },
            onError: (errors) => console.log(errors)
        });
    }
}

function onDelete(id: number) {
    if (confirm(trans('general.are_you_sure'))) {
        router.delete(route(props.delete_route, id), {
            onSuccess: (page) => addToast(page.props.notification),
            onError: (errors) => console.log(errors)
        });
    }
}
</script>
