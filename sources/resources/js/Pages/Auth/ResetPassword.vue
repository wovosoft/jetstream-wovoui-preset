<script setup lang="ts">
import {Head, useForm} from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/Basic/AuthenticationCard.vue';
import AuthenticationCardLogo from '@/Components/Basic/AuthenticationCardLogo.vue';

import route from "ziggy-js";
import {Button, Feedback, FormGroup, Input} from "@wovosoft/wovoui";

const props = defineProps({
    email: String,
    token: String,
});

const form = useForm({
    token: props.token,
    email: props.email,
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.post(route('password.update'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <Head title="Reset Password"/>

    <AuthenticationCard>
        <template #logo>
            <AuthenticationCardLogo/>
        </template>

        <form @submit.prevent="submit">
            <FormGroup :label="$t('general.email')">
                <Input
                    id="email"
                    v-model="form.email"
                    type="email"
                    class="mt-1 block w-full"
                    required
                    autofocus
                    :class="{'is-invalid':!!form.errors.email}"
                />
                <Feedback type="invalid" class="mt-2" :message="form.errors.email"/>
            </FormGroup>

            <FormGroup :label="$t('general.password')">
                <Input
                    id="password"
                    v-model="form.password"
                    type="password"
                    class="mt-1 block w-full"
                    required
                    autocomplete="new-password"
                    :class="{'is-invalid':!!form.errors.password}"
                />
                <Feedback type="invalid" :message="form.errors.password"/>
            </FormGroup>

            <FormGroup label="Confirm Password">
                <Input
                    id="password_confirmation"
                    v-model="form.password_confirmation"
                    type="password"
                    class="mt-1 block w-full"
                    required
                    autocomplete="new-password"
                    :class="{'is-invalid':!!form.errors.password_confirmation}"
                />
                <Feedback type="invalid" class="mt-2" :message="form.errors.password_confirmation"/>
            </FormGroup>

            <Button variant="primary" type="submit" :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing">
                Reset Password
            </Button>
        </form>
    </AuthenticationCard>
</template>
