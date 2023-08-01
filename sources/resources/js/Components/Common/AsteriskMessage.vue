<script setup lang="ts">
import {InfoCircleFill} from "@wovosoft/wovoui-icons";
import {Alert, Flex, FlexItem} from "@wovosoft/wovoui";
</script>

<template>
    <Alert show variant="info" dismissible>
        <Flex>
            <FlexItem>
                <InfoCircleFill/>
            </FlexItem>
            <FlexItem class="ps-3">
                Asterisk (<span class="text-danger">*</span>) Marked Fields are required
            </FlexItem>
        </Flex>
    </Alert>
</template>
