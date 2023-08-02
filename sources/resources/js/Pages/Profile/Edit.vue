<script setup lang="ts">
import DeleteUserForm from './Partials/DeleteUserForm.vue';
import UpdatePasswordForm from './Partials/UpdatePasswordForm.vue';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm.vue';
import {Head} from '@inertiajs/vue3';
import {Container} from "@wovosoft/wovoui";
import {PropType} from "vue";

defineProps({
    mustVerifyEmail: {
        type: Boolean as PropType<boolean>,
    },
    status: {
        type: String as PropType<string>,
    },
});
</script>

<template>
    <Head title="Profile"/>

    <Container>
        <UpdateProfileInformationForm
            class="mt-3"
            :must-verify-email="mustVerifyEmail"
            :status="status"
        />
        <UpdatePasswordForm class="mt-3"/>
        <DeleteUserForm class="my-3"/>
    </Container>
</template>
