//full page datatable, in one page there should be only one datatable.
//multiple database won't work properly because window.location is used as api url

import {onMounted, ref, Ref} from "vue";
import {Input} from "@wovosoft/wovoui";
import {router} from "@inertiajs/vue3";


export function pageChanged(e) {
    let url = new URL(window.location.href);
    url.searchParams.set("per_page", e.target.value);
    url.searchParams.delete("page");
    router.visit(url.href);
}

export function searchItems(query: Ref<string> | string, queries: { [key: string]: any } = null) {
    let url = new URL(window.location.href);

    let q = typeof query === "string" ? query : query?.value;
    if (q) {
        url.searchParams.set("query", q);
    } else {
        url.searchParams.delete("query");
    }

    (typeof queries === 'object') && queries && Object.keys(queries).forEach(key => {
        if (queries[key] !== null) {
            if (typeof queries[key] === 'number' || typeof queries[key] === "string" || typeof queries[key] === "boolean") {
                url.searchParams.set(key, queries[key]?.toString());
            }
        } else if (url.searchParams.has(key)) {
            url.searchParams.delete(key);
        }

    });
    url.searchParams.delete("page");

    router.visit(url.href);
}

export function initDatableState(query: Ref<string>, searchElement: Ref<InstanceType<typeof Input> | null>) {
    onMounted(() => {
        let url = new URL(window.location.href);
        if (url.searchParams.has("query")) {
            query.value = url.searchParams.get("query");
            searchElement.value?.$el.focus();
        }
    });
}

export function withTrashed() {
    let url = new URL(window.location.href);
    url.searchParams.set("with_trashed", "yes");
    url.searchParams.set("page", "1");
    url.searchParams.delete("only_trashed");
    router.visit(url.href);
}

export function onlyTrashed() {
    let url = new URL(window.location.href);
    url.searchParams.delete("with_trashed");
    url.searchParams.set("page", "1");
    url.searchParams.set("only_trashed", "yes");
    router.visit(url.href);
}

export function realData() {
    let url = new URL(window.location.href);
    url.searchParams.delete("with_trashed");
    url.searchParams.delete("only_trashed");
    url.searchParams.delete("page");
    router.visit(url.href);
}

export default function () {
    const query = ref<string | null>(null);
    const search = ref<InstanceType<typeof Input> | null>();

    return {
        query,
        search
    }
}
