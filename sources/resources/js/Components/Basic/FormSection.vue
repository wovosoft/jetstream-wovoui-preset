<script setup lang="ts">
import {computed, useSlots} from 'vue';
import SectionTitle from './SectionTitle.vue';
import {Card, Col, Row} from "@wovosoft/wovoui";

defineEmits(['submitted']);

const hasActions = computed(() => !!useSlots().actions);
</script>

<template>
    <Row>
        <SectionTitle>
            <template #title>
                <slot name="title"/>
            </template>
            <template #description>
                <slot name="description"/>
            </template>
        </SectionTitle>

        <Col :md="6" :sm="12">
            <form @submit.prevent="$emit('submitted')">
                <Card footer-class="bg-transparent" class="shadow rounded-0 border-0">
                    <slot name="form"/>
                    <template #footer>
                        <template v-if="hasActions">
                            <slot name="actions"/>
                        </template>
                    </template>
                </Card>
            </form>
        </Col>
    </Row>
</template>
