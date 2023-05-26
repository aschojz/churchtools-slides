<script setup lang="ts">
import { ref } from 'vue';
import Container from '../components/Container.vue';
import { scale } from '../components/helper.js';
import { useFonts } from '../composables/useFonts';
import { useStore } from '../store';

defineProps<{
    label?: string;
}>();

const store = useStore();
const { font, titleFont } = useFonts();

const containerRef = ref();
defineExpose({ containerRef });
</script>

<template>
    <Container ref="containerRef" :title="label" image="title.jpg">
        <template #config> </template>
        <v-layer :config="{ x: 240 / scale, y: 620 / scale }">
            <v-text
                v-if="store.subtitleIsTitle"
                :config="{
                    ...titleFont(130),
                    text: store.subtitle.de,
                    y: -100,
                }"
            />
            <v-text
                v-else
                :config="{
                    ...font(52, 1, 'light'),
                    lineHeight: 1.3,
                    text: store.subtitle.de,
                }"
            />
        </v-layer>
    </Container>
</template>
