<script setup lang="ts">
import { ref } from 'vue';
import Container from '../components/Container.vue';

defineProps<{
    image: string;
    label?: string;
}>();

const containerRef = ref();
defineExpose({ containerRef });
</script>

<template>
    <Container ref="containerRef" :title="label" :image="image"> </Container>
</template>
