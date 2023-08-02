<script setup>
import ApplicationLogo from '@/Components/Basic/ApplicationLogo.vue';
import {Container, Card} from "@wovosoft/wovoui";
import {Link} from "@inertiajs/vue3";

</script>

<template>
    <Container class="text-center pt-5">
        <Card class="border-0">
            <div>
                <ApplicationLogo class="block h-12 w-auto"/>
            </div>
            <h3 class="mt-5 text-muted">
                BKB GoAML CTR/STR <br/>
                Management System
            </h3>
            <div class="text-secondary small">
                Developed by- ICT Operation Department,<br/>
                Head Office, Bangladesh Krishi Bank
            </div>
<!--            <Link class="btn btn-primary mt-5" style="min-width: 100px;" :href="route('docs.contact')">-->
<!--                Support-->
<!--                <hr/>-->
<!--                সাপোর্টের জন্য যোগাযোগ-->
<!--            </Link>-->
        </Card>

    </Container>
</template>
