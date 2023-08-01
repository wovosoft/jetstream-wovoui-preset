import {ref} from "vue";

export const states = ref<{ [key: string]: any }>({
    isShownPersonExtraSearches: false,
    isShownAccountExtraSearches: false,
});

/**
 * @param key
 * @param value
 */
export function setState(key: string, value: any) {
    return states.value[key] = value;
}

/**
 * @param key
 */
export function getState(key: string) {
    return states.value[key];
}
