<template>
    <BasicDatatable
        :allow-new="can(ThePermissions.CREATE_PERMISSIONS)"
        :title="title"
        :items="items"
        :store_url="store_url"
        :delete_route="delete_route"
        :fields="fields">
        <template #form="{item}">
            <FormGroup :label="$t('general.name')">
                <Input
                    size="sm"
                    v-model="item.name"
                    :required="true"
                />
            </FormGroup>
        </template>
    </BasicDatatable>
</template>

<script lang="ts" setup>
import BasicDatatable from "@/Components/Basic/BasicDatatable.vue";
import {computed, PropType} from "vue";
import {Datatable} from "@/types";
import {formatDateTime} from "@/Composables/useFormats";
import {FormGroup, Input} from "@wovosoft/wovoui";
import {useI18n} from "vue-i18n";
import {can} from "@/Composables/usePermissions";
import ThePermissions from "@/Composables/thePermissions";

const {t} = useI18n();

const props = defineProps({
    title: {
        type: String as PropType<string>
    },
    items: {
        type: Object as PropType<Datatable<User>>
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
        type: Object as PropType<{ [key: string]: any }>,
        default: () => ({})
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

</script>
