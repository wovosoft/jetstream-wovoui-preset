<script setup lang="ts">
import MarkdownIt from "markdown-it";
import {PropType} from "vue";

const props = defineProps({
    content: String as PropType<string>
});

const md = new MarkdownIt();
</script>

<template>
    <div v-html="md.render(props.content)">
    </div>
</template>

