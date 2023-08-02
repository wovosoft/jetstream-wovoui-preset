<script setup lang="ts">
import SectionTitle from './SectionTitle.vue';
import {Col, Row} from "@wovosoft/wovoui";
</script>

<template>
    <Row class="row">
        <SectionTitle>
            <template #title>
                <slot name="title"/>
            </template>
            <template #description>
                <slot name="description"/>
            </template>
        </SectionTitle>

        <Col :md="6" :sm="12">
            <div class="px-4 py-5 sm:p-6 bg-white shadow sm:rounded-lg">
                <slot name="content"/>
            </div>
        </Col>
    </Row>
</template>
