<script lang="ts" setup>
import {Head, Link, useForm} from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/Basic/AuthenticationCard.vue';
import AuthenticationCardLogo from '@/Components/Basic/AuthenticationCardLogo.vue';
import {Button, Checkbox, Feedback, Flex, FormGroup, Input} from "@wovosoft/wovoui";
import route from "ziggy-js";

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: false,
});

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <Head title="Register"/>

    <AuthenticationCard>
        <template #logo>
            <AuthenticationCardLogo/>
        </template>

        <form @submit.prevent="submit">
            <FormGroup :label="$t('general.name')">
                <Input
                    id="name"
                    placeholder="Your Full Name"
                    v-model="form.name"
                    type="text"
                    class="mt-1 block w-full"
                    required
                    autofocus
                    :class="{'is-invalid':!!form.errors.name}"
                    autocomplete="name"
                />
                <Feedback type="invalid" class="mt-2" :message="form.errors.name"/>
            </FormGroup>

            <FormGroup :label="$t('general.email')">
                <Input
                    id="email"
                    :placeholder="$t('general.email_address')"
                    v-model="form.email"
                    type="email"
                    :class="{'is-invalid':!!form.errors.email}"
                    class="mt-1 block w-full"
                    required
                />
                <Feedback type="invalid" :message="form.errors.email"/>
            </FormGroup>

            <FormGroup :label="$t('general.password')">
                <Input
                    placeholder="Your Password"
                    id="password"
                    v-model="form.password"
                    type="password"
                    class="mt-1 block w-full"
                    required
                    :class="{'is-invalid':!!form.errors.password}"
                    autocomplete="new-password"
                />
                <Feedback type="invalid" :message="form.errors.password"/>
            </FormGroup>

            <FormGroup label="Confirm Password">
                <Input
                    placeholder="Confirm Password"
                    id="password_confirmation"
                    v-model="form.password_confirmation"
                    type="password"
                    class="mt-1 block w-full"
                    required
                    :class="{'is-invalid':!!form.errors.password_confirmation}"
                    autocomplete="new-password"
                />
                <Feedback type="invalid" :message="form.errors.password_confirmation"/>
            </FormGroup>

            <FormGroup v-if="$page.props.jetstream.hasTermsAndPrivacyPolicyFeature" class="mt-4">
                <Checkbox id="terms" v-model="form.terms" name="terms" required/>

                <div class="ml-2">
                    I agree to the <a target="_blank" :href="route('terms.show')"
                                      class="underline text-sm text-gray-600 hover:text-gray-900">Terms of
                    Service</a> and <a target="_blank" :href="route('policy.show')"
                                       class="underline text-sm text-gray-600 hover:text-gray-900">Privacy
                    Policy</a>
                </div>
                <Feedback type="invalid" class="mt-2" :message="form.errors.terms"/>
            </FormGroup>

            <Flex class="mt-4" jc="between">
                <Link :href="route('login')" class="text-decoration-none">
                    Already registered?
                </Link>

                <Button variant="primary"
                        class="ml-4"
                        type="submit"
                        :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing">
                    Register
                </Button>
            </Flex>
        </form>
    </AuthenticationCard>
</template>
