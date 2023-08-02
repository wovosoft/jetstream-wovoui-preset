<template>
    <Head :title="title"/>
    <div>
        <Container fluid>
            <div class="fs-5">{{ title }}</div>
            <Row :g="2">
                <slot name="prepend_extra_items" :queries="queries as {[key:string]:any}"></slot>
            </Row>
        </Container>
        <component :is="noContainer?'div':Container" :fluid="!noContainer?true:null">
            <slot name="overview"/>
            <component v-if="!noGenerate"
                       class="mt-3"
                       :is="noCard?'div':Card"
                       :header-class="headerClass"
                       :body-class="bodyClass"
                       :footer-class="footerClass">
                <template #header>
                    <div class="d-md-flex" v-if="!noHeader">
                        <FlexItem grow>
                            <slot name="header" :queries="queries as {[key:string]:any}">
                                <BasicDatatableHead
                                    no-title
                                    :items="items"
                                    v-model:query="queries.query"
                                    :title="title">
                                    <template #actions>
                                        <Button variant="dark" v-if="allowNew" @click="e=>$emit('click:new',e)">
                                            New
                                        </Button>
                                    </template>
                                </BasicDatatableHead>
                            </slot>
                        </FlexItem>
                    </div>
                </template>
                <slot v-if="!noBody"/>
                <template #footer v-if="!noFooter">
                    <slot name="footer">
                        <PageLinks pagination-class="mb-0" :pages="items"/>
                    </slot>
                </template>
            </component>
            <slot v-else/>
        </component>
    </div>
</template>

<script lang="ts" setup>
import {Container, Card, Button, FlexItem, Row} from "@wovosoft/wovoui";
import PageLinks from "@/Components/Basic/PageLinks.vue";
import {PropType} from "vue";
import {Datatable} from "@/types";
import {Head} from "@inertiajs/vue3";
import BasicDatatableHead from "@/Components/Basic/BasicDatatableHead.vue";

const props = defineProps({
    title: {type: String as PropType<string>, default: null},
    bodyClass: {default: () => ["p-2"]},
    headerClass: {default: () => ["px-2", "py-1"]},
    footerClass: {default: () => ["px-2", "py-1"]},
    items: {type: Object as PropType<Datatable<object>>, default: () => null},
    allowNew: {type: Boolean as PropType<boolean>, default: false},
    noFooter: {type: Boolean as PropType<boolean>, default: false},
    noCard: {type: Boolean as PropType<boolean>, default: false},
    noBody: {type: Boolean as PropType<boolean>, default: false},
    noHeader: {type: Boolean as PropType<boolean>, default: false},
    noGenerate: {type: Boolean as PropType<boolean>, default: false},
    noContainer: {type: Boolean as PropType<boolean>, default: false},
    queries: {default: null},
});

defineEmits<{
    (e: 'click:new', value: any): void
}>();
</script>

