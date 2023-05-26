<script setup lang="ts">
import { computed, ref } from 'vue';
import Container from '../components/Container.vue';
import { normalFont, scale } from '../components/helper.js';
import { useStore } from '../store';

defineProps<{
    label?: string;
}>();

const store = useStore();

const fontConfig = computed(() => ({
    ...normalFont,
    fill: 'rgb(255,255,255)',
    fontFamily: 'MyriadPro-Light',
    fontSize: 52 / scale,
    lineHeight: 1.3,
}));

const containerRef = ref();
defineExpose({ containerRef });
</script>

<template>
    <Container ref="containerRef" :title="label" image="title.jpg">
        <template #config> </template>
        <v-layer :config="{ x: 240 / scale, y: 620 / scale }">
            <v-text
                :config="{
                    ...fontConfig,
                    text: store.subtitle.de,
                }"
            />
        </v-layer>
    </Container>
</template>
