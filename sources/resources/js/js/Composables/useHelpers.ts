import {addToast} from "@/Composables/useToasts";
import {router} from "@inertiajs/vue3";
import route from "ziggy-js";

export const obj2table = (data, skip = [], take = []) =>
    Object.entries(data)
        .map(([key, value]) => {
            if (Array.isArray(skip) && skip.includes(key)) {
                return null;
            }
            return ({key, value});
        })
        //@ts-ignore
        .filter(i => {
            if (!take || (Array.isArray(take) && take.length <= 0)) {
                return true;
            }
            //@ts-ignore
            return take.includes(i.key);

        })
        .filter(i => i !== null);

export const toTitle = (str: string) => str
    .replaceAll("_", " ")
    .replace(/(?:^|\s)\S/g, (match) => match.toUpperCase());

/**
 *
 * @param target Target Reactive Object
 * @param value Value Object
 * @param pick Values to be picked up
 * @param skip Values to be skipped
 * @return target
 */
export const $set = (target: object, value: object, pick = [], skip = []) => {
    let keys = Object.keys(value);
    if (Array.isArray(pick) && pick.length > 0) {
        keys = keys.filter(i => pick.includes(i));
    }
    if (Array.isArray(skip) && skip.length > 0) {
        keys = keys.filter(i => !skip.includes(i));
    }
    keys.forEach(key => target[key] = value[key]);
    return target;
}
export const $reset = (target: object, keys = [], value: any, exclude = {}) => {
    keys.filter(key => !Object.keys(exclude).includes(key)).forEach(key => target[key] = value);
    return target;
}


/**
 * @link https://github.com/chartjs/Chart.js/blob/master/src/helpers/helpers.core.ts#L15-L21
 */

export const uid = (() => {
    let id = 0;
    return () => id++;
})();

/**
 * Highlight fulltext keywords
 * @link https://stackoverflow.com/a/75110553
 * @param sentence
 * @param filter
 */
export function fulltextHighlight(sentence: string, filter: string) {
    if (!filter || (filter || "").toString().length <= 2) {
        return sentence;
    }
    const tokens = [...new Set(filter.split(' '))]
        .map(s => s.trim())
        .filter(s => s.length)
        .sort((a, b) => b.length - a.length);

    const pattern = new RegExp(`(${tokens.join('|')})`, 'ig');

    return sentence.replace(pattern, match => `<mark>${match}</mark>`);
}

export function omitObject(key, obj) {
    const {[key]: omitted, ...rest} = obj;
    return rest;
}

export const callBackOptions = (callback = null) => ({
    onSuccess: (page) => {
        addToast(page.props.notification);

        if (typeof callback === "function") {
            callback(page);
        }
    },
    onError: (err) => console.log(err)
});

export function trashItem(url: string, message: string) {
    if (confirm(message)) {
        router.delete(url, {
            onSuccess: (page) => addToast(page.props.notification),
            onError: (errors) => console.log(errors)
        });
    }
}
