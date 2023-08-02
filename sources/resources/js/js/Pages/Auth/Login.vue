<script setup lang="ts">
import {Head, Link, useForm} from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/Basic/AuthenticationCard.vue';
import AuthenticationCardLogo from '@/Components/Basic/AuthenticationCardLogo.vue';
import {Button, Checkbox, Feedback, Flex, FlexItem, FormGroup, Input, Spinner} from "@wovosoft/wovoui";
import route from "ziggy-js";
import {PropType} from "vue";

defineProps({
    canResetPassword: Boolean as PropType<boolean>,
    status: String as PropType<string>,
});

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.transform(data => ({
        ...data,
        remember: form.remember ? 'on' : '',
    })).post(route('login'), {
        onFinish: () => form.reset('password')
    });
};
</script>

<template>
    <Head title="Log in"/>

    <AuthenticationCard title="Login">
        <template #logo>
            <AuthenticationCardLogo/>
        </template>

        <div v-if="status" class="mb-4">
            {{ status }}
        </div>

        <form @submit.prevent="submit">
            <FormGroup label="Email">
                <Input
                    name="email"
                    v-model="form.email"
                    type="email"
                    placeholder="Your Branch Email"
                    :class="{'is-invalid':!!form.errors.email}"
                    required
                    autofocus
                />
                <Feedback type="invalid" :message="form.errors.email"/>
            </FormGroup>

            <FormGroup label="Password">
                <Input
                    name="password"
                    v-model="form.password"
                    :class="{'is-invalid':!!form.errors.password}"
                    type="password"
                    placeholder="Your Password"
                    required
                    autocomplete="current-password"
                />
                <Feedback type="invalid" :message="form.errors.password"/>
            </FormGroup>

            <FormGroup>
                <Checkbox v-model="form.remember" name="remember">
                    Remember me
                </Checkbox>
            </FormGroup>

            <Flex class="mt-4">
                <Link v-if="canResetPassword" :href="route('password.request')" class="text-sm text-decoration-none">
                    Forgot your password?
                </Link>
                <Link v-if="route().has('register')" :href="route('register')" class="ms-3 text-decoration-none">
                    New User?
                </Link>
                <FlexItem class="ms-auto">
                    <Button variant="primary"
                            type="submit"
                            :disabled="form.processing">
                        <Spinner size="sm" v-if="form.processing"/>
                        Log in
                    </Button>
                </FlexItem>
            </Flex>
        </form>
    </AuthenticationCard>
</template>
