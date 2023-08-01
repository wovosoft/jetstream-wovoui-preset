<script setup lang="ts">
import {getContactType} from "@/Options";
import {computed, PropType} from "vue";
import {DataTable} from "@wovosoft/wovoui";
import {useI18n} from "vue-i18n";

const props = defineProps({
    addresses: Array as PropType<TAddress[]>
});

const {t} = useI18n();

const fields = computed(() => [
    {
        key: 'address_type',
        label: t('general.address_type'),
        formatter: (v, k) => getContactType(v[k])?.text
    },
    {key: 'address', label: t('general.address')},
    {key: 'town', label: t('general.town')},
    {key: 'city', label: t('general.city')},
]);
</script>

<template>
    <DataTable
        bordered
        small
        :items="addresses"
        :fields="fields"
    />
</template>
