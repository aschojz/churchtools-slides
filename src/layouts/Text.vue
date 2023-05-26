<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Container from '../components/Container.vue';
import { scale } from '../components/helper.js';
import { useFonts } from '../composables/useFonts';
import useKonva from '../composables/useKonva';

const props = defineProps<{
    title?: string;
    text?: string[];
    label?: string;
}>();

const { createImg } = useKonva();
const image = ref(),
    title = ref(''),
    text = ref<string[]>([]);
onMounted(() => {
    init();
    createImg('./slide2.jpg', image);
});

const init = () => {
    title.value = props.title ?? '';
    text.value = props.text ?? ([] as string[]);
};

const { font, titleFont } = useFonts();
const fontConfig = computed(() => ({
    ...font(52),
    lineHeight: 1.3,
}));

const containerRef = ref();
defineExpose({ containerRef });
</script>

<template>
    <Container ref="containerRef" :title="label" image="./slide2.jpg">
        <template #config> </template>
        <v-layer :config="{ x: 200 / scale, y: 150 / scale }">
            <v-text
                :config="{
                    ...titleFont(),
                    text: 'Translation - Traducción -  перевод',
                }"
            />
            <v-text
                v-for="(t, index) in text"
                :key="index"
                :config="{
                    ...fontConfig,
                    text: t,
                    y: 200 / scale + (170 / scale) * index,
                }"
            />
        </v-layer>
    </Container>
</template>
