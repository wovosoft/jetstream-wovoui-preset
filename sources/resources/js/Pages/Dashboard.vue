<script setup>
import {Head} from '@inertiajs/vue3';
import {Card, Container} from "@wovosoft/wovoui";
</script>

<template>
    <Head title="Dashboard"/>

    <Container class="py-12">
        <Card>
            {{$page.props?.auth?.user?.permissions}}
        </Card>
    </Container>
</template>
