<script setup lang="ts">
import {ref} from 'vue';
import {Head, useForm} from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/Basic/AuthenticationCard.vue';
import AuthenticationCardLogo from '@/Components/Basic/AuthenticationCardLogo.vue';
import {Button, Feedback, FormGroup, Input} from "@wovosoft/wovoui";
import route from "ziggy-js";

const form = useForm({
    password: '',
});

const passwordInput = ref<InstanceType<typeof Input>>(null);

const submit = () => {
    form.post(route('password.confirm'), {
        onFinish: () => {
            form.reset();
            passwordInput.value?.$el.focus();
        },
    });
};
</script>

<template>
    <Head title="Secure Area"/>

    <AuthenticationCard title="Confirm Password">
        <template #logo>
            <AuthenticationCardLogo/>
        </template>

        <div class="mb-4 text-sm text-secondary">
            This is a secure area of the application. Please confirm your password before continuing.
        </div>

        <form @submit.prevent="submit">
            <FormGroup label="Password">
                <Input
                    id="password"
                    ref="passwordInput"
                    v-model="form.password"
                    type="password"
                    required
                    autocomplete="current-password"
                    autofocus
                    :class="{'is-invalid':!!form.errors.password}"
                />
                <Feedback type="invalid" :message="form.errors.password"/>
            </FormGroup>

            <div class="flex justify-end mt-4">
                <Button variant="primary"
                        type="submit"
                        :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing">
                    Confirm
                </Button>
            </div>
        </form>
    </AuthenticationCard>
</template>
