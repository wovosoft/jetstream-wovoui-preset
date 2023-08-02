<script setup lang="ts">
import DeleteUserForm from '@/Pages/Profile/Partials/DeleteUserForm.vue';
import LogoutOtherBrowserSessionsForm from '@/Pages/Profile/Partials/LogoutOtherBrowserSessionsForm.vue';
import TwoFactorAuthenticationForm from '@/Pages/Profile/Partials/TwoFactorAuthenticationForm.vue';
import UpdatePasswordForm from '@/Pages/Profile/Partials/UpdatePasswordForm.vue';
import UpdateProfileInformationForm from '@/Pages/Profile/Partials/UpdateProfileInformationForm.vue';
import {Container} from "@wovosoft/wovoui";
import {PropType} from "vue";

defineProps({
    confirmsTwoFactorAuthentication: Boolean as PropType<boolean>,
    sessions: Array as PropType<any[]>,
});
</script>

<template>
    <Container class="mt-3" size="xxl">
        <UpdateProfileInformationForm
            v-if="$page.props.jetstream.canUpdateProfileInformation"
            :user="$page.props.auth.user"
        />

        <UpdatePasswordForm
            v-if="$page.props.jetstream.canUpdatePassword"
            class="mt-3"
        />

        <TwoFactorAuthenticationForm
            v-if="$page.props.jetstream.canManageTwoFactorAuthentication"
            :requires-confirmation="confirmsTwoFactorAuthentication"
            class="mt-10 sm:mt-0"
        />

        <LogoutOtherBrowserSessionsForm
            :sessions="sessions"
            class="mt-3"
        />

        <DeleteUserForm
            v-if="$page.props.jetstream.hasAccountDeletionFeatures"
            class="mt-3"
        />
    </Container>
</template>
