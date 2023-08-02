<script setup lang="ts">
import MarkdownIt from "markdown-it";

const props = defineProps({
    content: String
});

const md = new MarkdownIt();
</script>

<template>
    <div v-html="md.render(props.content)">
    </div>
</template>

