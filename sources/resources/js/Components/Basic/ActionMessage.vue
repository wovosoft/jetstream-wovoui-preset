<script setup lang="ts">
import {PropType} from "vue";

defineProps({
    on: Boolean as PropType<boolean>,
});
</script>

<template>
    <div>
        <transition leave-active-class="transition ease-in duration-1000" leave-from-class="opacity-100"
                    leave-to-class="opacity-0">
            <div v-show="on" class="text-sm text-secondary">
                <slot/>
            </div>
        </transition>
    </div>
</template>
