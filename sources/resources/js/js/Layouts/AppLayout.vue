<script setup lang="ts">
import {PropType} from 'vue';
import {Head} from '@inertiajs/vue3';
import TheNavbar from "@/Components/Basic/TheNavbar.vue";
import {
    ToastContainer, Toast, ToastBody, ButtonClose
} from "@wovosoft/wovoui";
import {removeToast, toasts} from "@/Composables/useToasts";

import {version} from "./../../../package.json";

defineProps({
    title: String as PropType<string>,
    app_name: String as PropType<string>,
});


</script>

<template>
    <Head :title="title"/>
    <TheNavbar :app_name="app_name"/>
    <slot/>
    <footer class="footer border-top text-muted small bg-light mt-2 fst-6 ps-3">
        <small>Developed By - ICT Operation Department, Head Office, Bangladesh Krishi Bank - v{{ version }}</small>
    </footer>
    <ToastContainer
        placement="top-right"
        container="body"
        class="position-fixed pt-2 pe-2"
        style="z-index: 9999">
        <template v-for="(toast,toast_index) in toasts">
            <Toast show :variant="toast?.variant" no-body class="text-white">
                <div class="d-flex">
                    <ToastBody>
                        {{ toast?.message }}
                    </ToastBody>
                    <ButtonClose class="me-2 m-auto" white @click="removeToast(toast_index)"/>
                </div>
            </Toast>
        </template>
    </ToastContainer>
</template>
