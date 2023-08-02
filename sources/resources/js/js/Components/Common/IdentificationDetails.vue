<script setup lang="ts">
import {getCountry, getIdentifierType} from "@/Options";
import {computed, PropType} from "vue";
import {DataTable} from "@wovosoft/wovoui";
import {useI18n} from "vue-i18n";
import {formatDate} from "@/Composables/useFormats";

const props = defineProps({
    items: Array as PropType<TPersonIdentification[]>
});

const {t} = useI18n();

const fields = computed(() => [
    {
        key: 'type',
        formatter: (v, k) => getIdentifierType(v[k])?.text
    },
    {
        key: 'number'
    },
    {
        key: 'issue_date',
        label: t('general.issue_date', 'Issue Country'),
        formatter: (v, k) => formatDate(v[k])
    },
    {
        key: 'expiry_date',
        label: t('general.expiry_date', 'Expiry Country'),
        formatter: (v, k) => formatDate(v[k])
    },
    {
        key: 'issue_country',
        label: t('general.issue_country', 'Issue Country'),
        formatter: (v, k) => getCountry(v[k])?.text || v[k]
    },
]);
</script>

<template>
    <DataTable
        bordered
        small
        :items="items"
        :fields="fields"
    />
</template>
