<script setup lang="ts">
import {getCommunicationType, getContactType, getCountry} from "@/Options";
import {computed, PropType} from "vue";
import {DataTable} from "@wovosoft/wovoui";
import {useI18n} from "vue-i18n";

const props = defineProps({
    phones: Array as PropType<TPhone[]>
});

const {t} = useI18n();

const fields = computed(() => [
    {
        key: 'tph_contact_type',
        label: t('general.tph_contact_type'),
        formatter: (v, k) => getContactType(v[k])?.text
    },
    {
        key: 'tph_communication_type',
        label: t('general.tph_communication_type'),
        formatter: (v, k) => getCommunicationType(v[k])?.text
    },
    {
        key: 'tph_number',
        label: t('general.tph_number')
    },
    {
        key: 'tph_country_prefix',
        label: t('general.tph_country_prefix'),
        formatter: (v, k) => getCountry(v[k])?.text
    },
]);
</script>

<template>
    <DataTable
        bordered
        small
        :items="phones"
        :fields="fields"
    />
</template>
