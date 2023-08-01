<script setup>
import SectionTitle from './SectionTitle.vue';
</script>

<template>
    <div class="row">
        <SectionTitle class="col-md-6 col-sm-12">
            <template #title>
                <slot name="title"/>
            </template>
            <template #description>
                <slot name="description"/>
            </template>
        </SectionTitle>

        <div class="col-md-6 col-sm-12">
            <div class="px-4 py-5 sm:p-6 bg-white shadow sm:rounded-lg">
                <slot name="content"/>
            </div>
        </div>
    </div>
</template>
