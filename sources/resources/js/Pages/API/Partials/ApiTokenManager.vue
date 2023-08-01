<script setup lang="ts">
import {ref} from 'vue';
import {useForm} from '@inertiajs/vue3';
import ActionMessage from '@/Components/Basic/ActionMessage.vue';
import ActionSection from '@/Components/Basic/ActionSection.vue';
import FormSection from '@/Components/Basic/FormSection.vue';
import SectionBorder from '@/Components/Basic/SectionBorder.vue';
import {Button, Checkbox, Feedback, FormGroup, Input, Modal} from "@wovosoft/wovoui";
import route from "ziggy-js";


const props = defineProps({
    tokens: Array,
    availablePermissions: Array,
    defaultPermissions: Array,
});

const createApiTokenForm = useForm({
    name: '',
    permissions: props.defaultPermissions,
});

const updateApiTokenForm = useForm({
    permissions: [],
});

const deleteApiTokenForm = useForm({});

const displayingToken = ref(false);
const managingPermissionsFor = ref(null);
const apiTokenBeingDeleted = ref(null);

const createApiToken = () => {
    createApiTokenForm.post(route('api-tokens.store'), {
        preserveScroll: true,
        onSuccess: () => {
            displayingToken.value = true;
            createApiTokenForm.reset();
        },
    });
};

const manageApiTokenPermissions = (token) => {
    updateApiTokenForm.permissions = token.abilities;
    managingPermissionsFor.value = token;
};

const updateApiToken = () => {
    updateApiTokenForm.put(route('api-tokens.update', managingPermissionsFor.value), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => (managingPermissionsFor.value = null),
    });
};

const confirmApiTokenDeletion = (token) => {
    apiTokenBeingDeleted.value = token;
};

const deleteApiToken = () => {
    deleteApiTokenForm.delete(route('api-tokens.destroy', apiTokenBeingDeleted.value), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => (apiTokenBeingDeleted.value = null),
    });
};
</script>

<template>
    <div>
        <!-- Generate API Token -->
        <FormSection @submitted="createApiToken">
            <template #title>
                Create API Token
            </template>

            <template #description>
                API tokens allow third-party services to authenticate with our application on your behalf.
            </template>

            <template #form>
                <!-- Token Name -->
                <FormGroup label="Name">
                    <Input
                        id="name"
                        v-model="createApiTokenForm.name"
                        type="text"
                        autofocus
                        :class="{'is-invalid':!!createApiTokenForm.errors.name}"
                    />
                    <Feedback type="invalid" :message="createApiTokenForm.errors.name"/>
                </FormGroup>

                <!-- Token Permissions -->
                <FormGroup label="Permissions" v-if="availablePermissions.length > 0">
                    <div class="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div v-for="permission in availablePermissions" :key="permission">
                            <Checkbox v-model="createApiTokenForm.permissions" :value="permission">
                                <span class="ml-2 text-sm text-gray-600">{{ permission }}</span>
                            </Checkbox>
                        </div>
                    </div>
                </FormGroup>
            </template>

            <template #actions>
                <ActionMessage :on="createApiTokenForm.recentlySuccessful" class="mr-3">
                    Created.
                </ActionMessage>

                <Button variant="primary" :class="{ 'opacity-25': createApiTokenForm.processing }"
                        :disabled="createApiTokenForm.processing">
                    Create
                </Button>
            </template>
        </FormSection>

        <div v-if="tokens.length > 0">
            <SectionBorder/>

            <!-- Manage API Tokens -->
            <div class="mt-10 sm:mt-0">
                <ActionSection>
                    <template #title>
                        Manage API Tokens
                    </template>

                    <template #description>
                        You may delete any of your existing tokens if they are no longer needed.
                    </template>

                    <!-- API Token List -->
                    <template #content>
                        <div class="space-y-6">
                            <div v-for="token in tokens" :key="token.id" class="flex items-center justify-between">
                                <div>
                                    {{ token.name }}
                                </div>

                                <div class="flex items-center">
                                    <div v-if="token.last_used_ago" class="text-sm text-gray-400">
                                        Last used {{ token.last_used_ago }}
                                    </div>

                                    <button
                                        v-if="availablePermissions.length > 0"
                                        class="cursor-pointer ml-6 text-sm text-gray-400 underline"
                                        @click="manageApiTokenPermissions(token)"
                                    >
                                        Permissions
                                    </button>

                                    <button class="cursor-pointer ml-6 text-sm text-red-500"
                                            @click="confirmApiTokenDeletion(token)">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </template>
                </ActionSection>
            </div>
        </div>

        <!-- Token Value Modal -->
        <Modal v-model="displayingToken"
               shrink
               no-ok-button
               @hidden="displayingToken = false">
            <h4>
                API Token
            </h4>

            <div>
                Please copy your new API token. For your security, it won't be shown again.
            </div>

            <div v-if="$page.props.jetstream.flash.token"
                 class="mt-4 bg-gray-100 px-4 py-2 rounded font-mono text-sm text-gray-500">
                {{ $page.props.jetstream.flash.token }}
            </div>
        </Modal>

        <!-- API Token Permissions Modal -->
        <Modal v-model="managingPermissionsFor" @hidden="managingPermissionsFor = null">
            <h4>
                API Token Permissions
            </h4>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="permission in availablePermissions" :key="permission">
                    <label class="flex items-center">
                        <Checkbox v-model:checked="updateApiTokenForm.permissions" :value="permission"/>
                        <span class="ml-2 text-sm text-gray-600">{{ permission }}</span>
                    </label>
                </div>
            </div>

            <template #footer>
                <Button variant="secondary" @click="managingPermissionsFor = null">
                    Cancel
                </Button>

                <Button variant="primary"
                        class="ml-3"
                        :class="{ 'opacity-25': updateApiTokenForm.processing }"
                        :disabled="updateApiTokenForm.processing"
                        @click="updateApiToken">
                    Save
                </Button>
            </template>
        </Modal>

        <!-- Delete Token Confirmation Modal -->
        <Modal v-model="apiTokenBeingDeleted"
               @ok.prevent="deleteApiToken"
               :loading="deleteApiTokenForm.processing"
               shrink
               @hidden="apiTokenBeingDeleted = null">
            <h4>
                Delete API Token
            </h4>

            Are you sure you would like to delete this API token?
        </Modal>
    </div>
</template>
