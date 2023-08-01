<template>
    <CrudLayout :title="title"
                :items="items"
                allow-new
                :queries="queries"
                @click:new="onEdit({id:null,name:null,email:null,roles:[]})">
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
               :title="$t('general.user_details')"
               header-class="text-bg-dark"
               close-btn-white
               size="lg"
               lazy
               :loading="currentItem?.processing"
               :okButtonOptions="{disabled:currentItem?.processing,variant:'primary'}"
               :ok-title="$t('general.submit')"
               @ok.prevent="onSubmit"
               @hidden="onHidden"
               shrink>
            <form @submit.prevent="onSubmit" ref="theForm">
                <Row class="border-bottom mb-3">
                    <Col :md="6" :sm="12">
                        <FormGroup :label="$t('general.name')+' *'">
                            <Input
                                :placeholder="$t('general.name')"
                                size="sm"
                                v-model="currentItem.name"
                                :required="true"
                                :state="!!currentItem.errors?.name?false:null"
                            />
                            <Feedback type="invalid" :message="currentItem.errors?.name"/>
                        </FormGroup>
                    </Col>
<!--                    <Col :md="6" :sm="12">-->
<!--                        <FormGroup label="Branch/Office *">-->
<!--                            <SelectOffice-->
<!--                                :class="{'is-invalid':!!currentItem.errors?.office_id}"-->
<!--                                :office="currentItem['office']"-->
<!--                                v-model="currentItem.office_id"-->
<!--                            />-->
<!--                            <Feedback type="invalid" :message="currentItem.errors?.office_id"/>-->
<!--                        </FormGroup>-->
<!--                    </Col>-->
                    <Col :md="6" :sm="12">
                        <FormGroup :label="$t('general.email_address')+' *'">
                            <Input
                                :placeholder="$t('general.email_address')"
                                size="sm"
                                v-model="currentItem.email"
                                :state="!!currentItem.errors?.email?false:null"
                                :required="true"
                            />
                            <Feedback type="invalid" :message="currentItem.errors?.office_id"/>
                        </FormGroup>
                    </Col>
                    <Col :md="6" :sm="12">
                        <FormGroup :label="$t('general.password')">
                            <Input
                                :placeholder="$t('general.password')"
                                size="sm"
                                type="password"
                                v-model="currentItem.password"
                                :required="!currentItem?.id"
                                :state="!!currentItem.errors?.password?false:null"
                            />
                            <Feedback type="invalid" :message="currentItem.errors?.password"/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col :md="4" :sm="12" v-for="role in roles">
                        <Checkbox
                            switch
                            :value="role"
                            :unchecked-value="null"
                            v-model="currentItem.roles">
                            {{ toTitle(role) }}
                        </Checkbox>
                    </Col>
                </Row>
                <!--{{ currentItem }}-->
            </form>
        </Modal>
    </CrudLayout>
</template>

<script lang="ts" setup>
import {computed, PropType, ref} from "vue";
import {Datatable} from "@/types";
import {formatDateTime} from "@/Composables/useFormats";
import CrudLayout from "@/Layouts/CrudLayout.vue";
import {DataTable, Modal, FormGroup, Input, Row, Col, Checkbox, Feedback} from "@wovosoft/wovoui";
import ActionButtons from "@/Components/Common/ActionButtons.vue";
import route from "ziggy-js";
import {addToast} from "@/Composables/useToasts";
import {router, useForm} from "@inertiajs/vue3";
import {$set} from "@/Composables/useHelpers";
import {toTitle} from "@/Composables/useHelpers";
import {useI18n} from "vue-i18n";
import SelectOffice from "@/Components/Selectors/SelectOffice.vue";

const {t} = useI18n();

const props = defineProps({
    title: {
        type: String as PropType<string>
    },
    items: {
        type: Object as PropType<Datatable<App.Models.User>>
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
    queries: {
        type: Object as PropType<{ [key: string]: any }>
    },
    roles: {
        type: Array as PropType<string[]>,
        default: () => ([])
    }
});

const fields = computed(() => [
    {key: 'id', label: t("general.id")},
    {
        key: 'name',
        label: t("general.name"),
    },
    // {
    //     key: 'office',
    //     label: "Office/Branch",
    //     formatter: (v, k) => [v[k].name, v[k].code].join('-')
    // },
    {key: 'email', label: t("general.email")},
    {
        key: 'roles',
        label: t("general.roles"),
        formatter: (v, k) => v[k]?.map(i => i.name).join(", ")
    },
    {
        key: 'created_at',
        label: t("general.created_at"),
        formatter: (v, k) => formatDateTime(v[k])
    },
    {
        key: 'action',
        label: t("general.action"),
        tdClass: 'text-end',
        thClass: 'text-end',
    },
]);

const isShownEdit = ref<boolean>(false);
const currentItem = useForm({
    id: null,
    name: null,
    office_id: null,
    email: null,
    password: null,
    roles: []
});

function onEdit(item: { [key: string]: unknown, roles: string[] | object[] }) {
    $set(currentItem, item, ['id', 'name', 'email', 'office_id', 'office']);
    currentItem.roles = [];
    item?.roles?.forEach(function (role) {
        if (typeof role === "string") {
            currentItem.roles.push(role);
        } else if (typeof role === "object" && !Array.isArray(role)) {
            currentItem.roles.push(role.name);
        }
    });
    isShownEdit.value = true;
}

function onHidden() {
    currentItem.reset();
}

const theForm = ref<HTMLFormElement>();

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
    if (confirm(t("are_you_sure"))) {
        router.delete(route(props.delete_route, id), {
            onSuccess: (page) => addToast(page.props.notification),
            onError: (errors) => console.log(errors)
        });
    }
}
</script>
