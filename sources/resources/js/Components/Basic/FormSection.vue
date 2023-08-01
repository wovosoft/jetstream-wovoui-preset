<script setup lang="ts">
import {computed, useSlots} from 'vue';
import SectionTitle from './SectionTitle.vue';
import {Card} from "@wovosoft/wovoui";

defineEmits(['submitted']);

const hasActions = computed(() => !!useSlots().actions);
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
        </div>
    </div>
</template>
