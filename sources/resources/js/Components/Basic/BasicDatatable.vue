<template>
    <Head :title="title"/>
    <CrudLayout :title="title" :items="items">
        <template #header>
            <slot name="overview"></slot>
            <BasicDatatableHead
                no-title
                :queries="queries"
                :items="items"
                v-model:query="queries.query">
                <template #actions>
                    <Button v-if="allowNew" @click="editItem({item:initialData || {}})">
                        New
                    </Button>
                </template>
            </BasicDatatableHead>
        </template>
        <DataTable
            small
            bordered
            hover
            striped
            :items="items.data"
            :fields="fields">
            <template #cell(action)="row">
                <slot name="prepend_actions_groups" :item="row.item"></slot>
                <ButtonGroup size="sm">
                    <slot name="prepend_actions" :item="row.item"></slot>
                    <Button variant="primary"
                            v-if="showView"
                            @click="showItem(row)">
                        <Eye/>
                    </Button>
                    <Button v-if="$slots.form && showEdit" @click="editItem(row)" variant="dark">
                        <Pencil/>
                    </Button>
                    <Button variant="danger" v-if="showDelete" @click="deleteItem(row.item)">
                        <Trash/>
                    </Button>
                    <slot name="append_actions" :item="row.item"></slot>
                </ButtonGroup>
            </template>
        </DataTable>
        <slot name="extra_footer"/>
        <Modal
            v-model="isShown"
            size="lg"
            button-size="sm"
            header-class="text-bg-dark py-2"
            close-btn-white
            footer-class="py-1"
            title="Details">
            <template v-if="currentItem && isShown">
                <DataTable
                    small
                    bordered
                    hover
                    striped
                    :items="obj2table(currentItem,skipFromView)"
                    :fields="viewFields"
                />
            </template>
        </Modal>
        <Modal
            v-if="$slots.form"
            v-bind="formModalProps"
            v-model="isEdit"
            button-size="sm"
            header-class="text-bg-dark py-2"
            close-btn-white
            ok-title="Submit"
            @ok.prevent="handleSubmission"
            :loading="submitting"
            :okButtonOptions="{disabled:submitting,variant:'primary'}"
            footer-class="py-1"
            title="Details">
            <template v-if="currentItem && isEdit">
                <form ref="theForm" @submit.prevent="handleSubmission">
                    <slot name="form" :item="currentItem"></slot>
                </form>
            </template>
        </Modal>
    </CrudLayout>
</template>

<script lang="ts" setup>
import {PropType, ref} from "vue";
import {Datatable} from "@/types";
import {
    DataTable, ButtonGroup, Button, Modal
} from "@wovosoft/wovoui";
import {Eye, Pencil, Trash} from "@wovosoft/wovoui-icons";
import useToasts from "@/Composables/useToasts";
import startCase from "lodash/startCase";
import dayjs from "dayjs";
import {Head, router} from "@inertiajs/vue3";
import BasicDatatableHead from "@/Components/Basic/BasicDatatableHead.vue";
import {obj2table} from "@/Composables/useHelpers";
import CrudLayout from "@/Layouts/CrudLayout.vue";
import route from "ziggy-js";

const {add: addToast} = useToasts();

const props = defineProps({
    queries: {
        type: Object as PropType<{ [key: string]: any }>,
        default: () => ({query: null})
    },
    allowNew: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    showView: {
        type: Boolean as PropType<boolean>,
        default: true
    },
    showEdit: {
        type: Boolean as PropType<boolean>,
        default: true
    },
    showDelete: {
        type: Boolean as PropType<boolean>,
        default: true
    },
    items: {
        type: Object as PropType<Datatable<object>>,
        default: () => ({})
    },
    title: {type: String as PropType<string>},
    store_url: {type: String as PropType<string>},
    delete_route: {type: String as PropType<string>},
    notification: {type: Object},
    fields: {type: Array as PropType<object[]>},
    formModalProps: {type: Object},
    initialData: {
        type: Object as PropType<object>,
        default: () => ({})
    },
    skipFromView: {
        type: Array as PropType<string[]>,
        default: () => ([])
    }
});


const currentItem = ref<{ [key: string]: any } | null>();

const isShown = ref<boolean>(false);
const isEdit = ref<boolean>(false);

function showItem(row) {
    currentItem.value = JSON.parse(JSON.stringify(row.item));
    isShown.value = true;
}

function editItem(row) {
    currentItem.value = JSON.parse(JSON.stringify(row.item));
    isEdit.value = true;
}

function deleteItem(item) {
    if (confirm("Are You Sure?")) {
        router.delete(route(props.delete_route, item.id), {
            onSuccess: function (page) {
                // console.log(res)
                //@ts-ignore
                addToast(page.props.notification);
            },
            onError: function (err) {
                console.log(err)
            }
        })
    }
}

const query = ref<string | null>();
const theForm = ref<HTMLFormElement>();
const submitting = ref<boolean>(false);

function handleSubmission() {
    if (theForm.value?.reportValidity()) {
        submitting.value = true;
        router.put(props.store_url, JSON.parse(JSON.stringify(currentItem.value)), {
            onSuccess: function (page) {
                currentItem.value = null;
                isEdit.value = false;
                //@ts-ignore
                addToast(page.props.notification);
                submitting.value = false;
            },
            onError: function (err) {
                console.log(err)
                submitting.value = false;
            }
        })
    }
}


const viewFields = [
    {
        key: 'key',
        formatter: (v, k) => startCase(v[k])
    },
    {
        key: 'value',
        formatter: (v, k) => {
            if (['created_at', 'updated_at'].includes(v.key) && v[k]) {
                return dayjs(v[k]).format("DD-MM-YYYY [at] hh:mm A");
            }
            return v[k];
        }
    }
]
</script>

