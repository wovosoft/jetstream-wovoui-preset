import {nextTick, ref} from "vue";
import {ColorVariants} from "@wovosoft/wovoui/dist/types";
import {uid} from "@/Composables/useHelpers";


export interface ToastType {
    title?: string | null;
    message?: string;
    variant?: ColorVariants;
    key: number | string;
}

export const toasts = ref<ToastType[]>([]);
export const addToast = (toast: ToastType | { original: ToastType } | unknown) => {
    let item = null;
    if (toast?.hasOwnProperty('original')) {
        item = toast['original'];
    } else {
        // @ts-ignore
        item = toast
    }
    const key = uid();
    toasts.value.push({
        ...item,
        key
    });

    nextTick(() => {
        setTimeout(() => {
            const index = toasts.value.findIndex(i => i.key === key);
            removeToast(index);
        }, 3000)
    })
};

export const removeToast = (index: number) => toasts.value.splice(index, 1);

export default () => ({
    add: (toast: ToastType) => toasts.value.push(toast),
    remove: (index: number) => toasts.value.splice(index, 1),
    toasts
});
