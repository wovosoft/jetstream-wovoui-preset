<template>
    <slot name="head_top"/>
    <div class="d-md-flex justify-content-between">
        <FlexItem v-if="!noTitle">
            <h3>{{ title }}</h3>
        </FlexItem>
        <slot name="prepend_extra_items" :queries="queries"/>
        <FlexItem class="pt-1" :class="middleFlexClass">
            <slot name="middle_col">
                <Input
                    ref="search"
                    size="sm"
                    @keyup.enter="searchItems(filter,queries)"
                    v-model="filter"
                    placeholder="Type & Hit Enter..."
                    type="search"
                />
            </slot>
        </FlexItem>
        <slot name="append_extra_items" :queries="queries"/>
        <FlexItem class="pt-1">
            <ButtonGroup v-if="$slots.actions" :size="actionSize" class="me-2">
                <slot name="actions"/>
            </ButtonGroup>
            <ButtonGroup :size="actionSize">
                <Select
                    @input="pageChanged"
                    v-model="items.per_page"
                    class="ms-auto"
                    style="max-width: 100px;"
                    size="sm"
                    :options="[5,10,15,20,30,50,100,500,1000]"
                />
                <Button @click="searchItems(filter,queries)">
                    Search
                </Button>
                <Button variant="danger" @click="resetQueries">
                    Reset
                </Button>
            </ButtonGroup>
        </FlexItem>
    </div>
    <slot name="head_bottom" :queries="queries"/>
</template>

<script lang="ts" setup>
import {
    FlexItem, Select, Input, Button, ButtonGroup
} from "@wovosoft/wovoui";
import {pageChanged, searchItems} from "@/Composables/useDatatable";
import {computed, PropType} from "vue";
import {Datatable} from "@/types";
import {router} from "@inertiajs/vue3";

const props = defineProps({
    title: {type: String as PropType<string>, default: null},
    query: {
        type: [String] as PropType<string | null>,
        default: null
    },
    items: {
        type: Object as PropType<Datatable<any>>,
        default: null
    },
    actionSize: {
        type: String as PropType<'sm' | 'lg'>,
        default: 'sm'
    },
    noTitle: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    middleFlexClass: {
        type: [Object, String, Array] as PropType<string | string[] | object>,
        default: null
    },
    queries: {
        type: Object as PropType<{
            [key: string]: any
        }>
    }
});


const emit = defineEmits<{
    (e: 'update:query', value: string | null): void
    (e: 'update:queries', value: any): void
}>();

const filter = computed({
    get: () => props.query || props.queries?.query,
    set: (value) => {
        emit("update:query", value || null);
        emit('update:queries', {...props.queries, query: value || null});
    }
});

function resetQueries() {
    let url = new URL(window.location.href);
    router.visit(url.origin + url.pathname)
}

</script>

