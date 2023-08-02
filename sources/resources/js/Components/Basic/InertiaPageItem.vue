<template>
    <li class="page-item" :class="{active}">
        <Link :href="href" class="page-link" :disabled="active">
            <slot></slot>
        </Link>
    </li>
</template>

<script lang="ts" setup>
import {Link} from '@inertiajs/vue3';
import {PropType} from "vue";

defineProps({
    href: String as PropType<string>,
    active: {type: Boolean as PropType<boolean>, default: false},
});
</script>

