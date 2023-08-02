<script setup lang="ts">
import {ref, reactive, nextTick, PropType} from 'vue';
import {Feedback, FormGroup, Input, Modal} from "@wovosoft/wovoui";
import axios from "axios";

const emit = defineEmits(['confirmed']);

defineProps({
    title: {
        type: String as PropType<string>,
        default: 'Confirm Password',
    },
    content: {
        type: String as PropType<string>,
        default: 'For your security, please confirm your password to continue.',
    },
    button: {
        type: String as PropType<string>,
        default: 'Confirm',
    },
});

const confirmingPassword = ref<boolean>(false);

const form = reactive({
    password: '',
    error: '',
    processing: false,
});

const passwordInput = ref<InstanceType<typeof Input>>(null);

const startConfirmingPassword = () => {
    axios.get(route('password.confirmation')).then(response => {
        if (response.data.confirmed) {
            emit('confirmed');
        } else {
            confirmingPassword.value = true;

            setTimeout(() => passwordInput.value?.$el.focus(), 250);
        }
    });
};

const confirmPassword = () => {
    form.processing = true;

    axios.post(route('password.confirm'), {
        password: form.password,
    }).then(() => {
        form.processing = false;

        closeModal();
        nextTick().then(() => emit('confirmed'));

    }).catch(error => {
        form.processing = false;
        form.error = error.response.data.errors.password[0];
        passwordInput.value?.$el.focus();
    });
};

const closeModal = () => {
    confirmingPassword.value = false;
    form.password = '';
    form.error = '';
};
</script>

<template>
    <span>
        <span @click="startConfirmingPassword">
            <slot/>
        </span>

        <Modal v-model="confirmingPassword"
               footer-class="py-1"
               button-size="sm"
               :ok-button-options="{disabled:form.processing}"
               @ok.prevent="confirmPassword"
               :ok-title="button"
               header-class="py-1 text-bg-secondary"
               close-btn-white
               @hidden="closeModal" :title="title">
            {{ content }}
                <FormGroup>
                    <Input
                        :class="{'is-invalid':!!form.error}"
                        ref="passwordInput"
                        v-model="form.password"
                        type="password"
                        class="mt-1 block w-3/4"
                        placeholder="Password"
                        @keyup.enter="confirmPassword"
                    />

                    <Feedback type="invalid" :message="form.error"/>
                </FormGroup>
        </Modal>
    </span>
</template>
