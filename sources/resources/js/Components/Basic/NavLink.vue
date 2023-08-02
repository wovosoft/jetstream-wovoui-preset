<script setup lang="ts">
import {computed, PropType} from 'vue';
import {Link} from '@inertiajs/vue3';

const props = defineProps({
    href: String as PropType<string>,
    active: Boolean as PropType<boolean>,
});

const classes = computed(() => {
    return props.active
        ? 'active'
        : '';
});
</script>

<template>
    <Link :href="href" :class="classes">
        <slot/>
    </Link>
</template>
