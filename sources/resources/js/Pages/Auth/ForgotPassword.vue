<script setup lang="ts">
import {Head, useForm} from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/Basic/AuthenticationCard.vue';
import AuthenticationCardLogo from '@/Components/Basic/AuthenticationCardLogo.vue';
import {Button, Feedback, FormGroup, Input} from "@wovosoft/wovoui";
import route from "ziggy-js";


defineProps({
    status: String,
});

const form = useForm({
    email: '',
});

const submit = () => {
    form.post(route('password.email'));
};
</script>

<template>
    <Head title="Forgot Password"/>

    <AuthenticationCard>
        <template #logo>
            <AuthenticationCardLogo/>
        </template>

        <div class="mb-4 text-sm text-gray-600">
            Forgot your password? No problem. Just let us know your email address and we will email you a password reset
            link that will allow you to choose a new one.
        </div>

        <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
            {{ status }}
        </div>

        <form @submit.prevent="submit">
            <FormGroup label="Email">
                <Input
                    id="email"
                    :placeholder="$t('general.email_address')"
                    :class="{'is-invalid':!!form.errors.email}"
                    v-model="form.email"
                    type="email"
                    class="mt-1 block w-full"
                    required
                    autofocus
                />
                <Feedback type="invalid" :message="form.errors.email"/>
            </FormGroup>

            <div class="d-flex">
                <Button variant="primary"
                        class="w-100"
                        type="submit"
                        :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing">
                    Email Password Reset Link
                </Button>
            </div>
        </form>
    </AuthenticationCard>
</template>
