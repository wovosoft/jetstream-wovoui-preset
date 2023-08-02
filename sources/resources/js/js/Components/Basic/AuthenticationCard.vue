<template>
    <div class="min-vh-100 bg-light">
        <div class="text-center py-5">
            <slot name="logo"/>
        </div>
        <h3 class="text-center text-muted mb-3">
            {{ title }}
        </h3>
        <Card style="max-width: 400px;" class="m-auto">
            <slot/>
        </Card>
    </div>
</template>
<script lang="ts" setup>
import {Card} from "@wovosoft/wovoui";
import {PropType} from "vue";

defineProps({
    title: {
        type: String as PropType<string>,
        required: true
    }
});
</script>
