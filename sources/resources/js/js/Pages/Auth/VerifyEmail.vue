<script setup lang="ts">
import {computed, PropType} from 'vue';
import {Head, Link, useForm} from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/Basic/AuthenticationCard.vue';
import AuthenticationCardLogo from '@/Components/Basic/AuthenticationCardLogo.vue';
import route from "ziggy-js";
import {Button} from "@wovosoft/wovoui";

const props = defineProps({
    status: String as PropType<string>,
});

const form = useForm({});

const submit = () => {
    form.post(route('verification.send'));
};

const verificationLinkSent = computed<boolean>(() => props.status === 'verification-link-sent');
</script>

<template>
    <Head title="Email Verification"/>

    <AuthenticationCard title="Email Verification">
        <template #logo>
            <AuthenticationCardLogo/>
        </template>

        <div class="mb-4 text-sm text-secondary">
            Before continuing, could you verify your email address by clicking on the link we just emailed to you? If
            you didn't receive the email, we will gladly send you another.
        </div>

        <div v-if="verificationLinkSent" class="mb-4 font-medium text-sm text-secondary">
            A new verification link has been sent to the email address you provided in your profile settings.
        </div>

        <form @submit.prevent="submit">
            <div class="mt-4 flex items-center justify-between">
                <Button variant="primary" type="submit" :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing">
                    Resend Verification Email
                </Button>

                <div>
                    <Link
                        :href="route('profile.show')"
                        class="text-sm text-secondary">
                        Edit Profile
                    </Link>

                    <Link
                        :href="route('logout')"
                        method="post"
                        as="button"
                        class="text-sm text-secondary ml-2">
                        Log Out
                    </Link>
                </div>
            </div>
        </form>
    </AuthenticationCard>
</template>
