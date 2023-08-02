<template>
    <Col :md="6" :sm="12">
        <div class="px-4 sm:px-0">
            <h3 class="text-lg font-medium text-gray-900">
                <slot name="title" />
            </h3>

            <p class="mt-1 text-sm text-gray-600">
                <slot name="description" />
            </p>
        </div>

        <div class="px-4 sm:px-0">
            <slot name="aside" />
        </div>
    </Col>
</template>
<script setup lang="ts">
import {Col} from "@wovosoft/wovoui";
</script>
