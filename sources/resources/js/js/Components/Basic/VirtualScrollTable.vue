<template>
    <div style="max-height: 500px;overflow: auto;" ref="scroller" @scroll="handleScroll">
        <div class="position-fixed text-bg-danger" style="z-index: 999;top:50px;">{{ state }}</div>
        <div class="border border-danger" :style="{height:(items.length*rowHeight)+'px'}" style="width: 100%;">
            <div style="position: fixed;">
                <table class="table table-bordered">
                    <thead class="table-dark">
                    <tr>
                        <!--                <th>SL</th>-->
                        <th>Txn #</th>
                        <th>Account</th>
                        <th>Person</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Created At</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="row in visibleRows">
                        <td>{{ row.id }}</td>
                        <td>
                            <component :is="getPerson(row)"/>
                        </td>
                        <td>
                            <component :is="getAccount(row)"/>
                        </td>
                        <td>{{ formatCurrency(row.amount_local) }}</td>
                        <td>{{ row.date_transaction }}</td>
                        <td>{{ formatDateTime(row.created_at) }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {formatCurrency, formatDateTime} from "@/Composables/useFormats";
import {computed, h, onMounted, PropType, reactive, ref} from "vue";

const scroller = ref(null);
const viewportHeight = ref(0);
const totalHeight = ref(0);

const props = defineProps({
    rowHeight: {
        type: Number as PropType<number>,
        default: 50,
    },
    items: {
        type: Array as PropType<any[]>,
        default: () => ([])
    }
});

const state = reactive({
    scrollTop: 0,
    startIndex: 0,
    endIndex: 0
});

const handleScroll = () => {
    state.scrollTop = scroller.value.scrollTop;
    state.startIndex = Math.floor(state.scrollTop / props.rowHeight);
    state.endIndex = Math.min(
        state.startIndex + numVisibleRows.value - 1,
        props.items.length - 1
    );
    // visibleRows.splice(0, visibleRows.length, ...props.items.slice(startIndex, endIndex + 1));
};

const numVisibleRows = computed(() => Math.ceil(viewportHeight.value / props.rowHeight));

onMounted(() => {
    console.log(scroller.value.clientHeight)
    viewportHeight.value = scroller.value.clientHeight;
    totalHeight.value = props.rowHeight * props.items.length;
    handleScroll();
});

const visibleRows = computed(() => props.items.slice(state.startIndex, state.endIndex))

const getPerson = (row) => {
    const person = row?.t_from?.person || row?.t_to?.person;
    return h('div', [
        h('div', [person?.first_name, person?.last_name].join(' ')),
        h('div', `(${person?.ssn || person?.passport_number || person?.id_number})`)
    ])
};

const getAccount = (row) => {
    const account = row?.t_from?.account || row?.t_to?.account;
    return h('div', [
        h('div', account?.account_name),
        h('div', `(${account?.account})`)
    ]);
};
</script>

