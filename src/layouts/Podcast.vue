<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import Container from '../components/Container.vue';
import { scale } from '../components/helper.js';
import { useFonts } from '../composables/useFonts';
import useKonva from '../composables/useKonva';
import { useStore } from '../store';

defineProps<{
    label?: string;
}>();

const { createImg } = useKonva();
const image = ref(),
    subtitle = ref('');

onMounted(async () => {
    init();
    createImg('./podcast.jpg', image);
});

const store = useStore();
watch(
    () => store.subtitle.de,
    () => init()
);
const init = () => {
    subtitle.value = store.subtitle.de ?? '';
};

const { font, titleFont } = useFonts();

const containerRef = ref();
defineExpose({ containerRef });
</script>

<template>
    <Container
        ref="containerRef"
        :title="label"
        image="./podcast.jpg"
        :width="1080"
    >
        <template #config>
            <label>
                <div>Untertitel</div>
                <textarea v-model="subtitle" rows="5" />
            </label>
        </template>
        <v-layer :config="{ x: 90 / scale, y: 680 / scale }">
            <v-text
                v-if="store.subtitleIsTitle"
                :config="{
                    ...titleFont(130),
                    text: store.subtitle.de,
                    y: -200,
                }"
            />
            <v-text
                v-else
                :config="{
                    ...font(100, 1, 'light'),
                    text: subtitle,
                }"
            />
        </v-layer>
    </Container>
</template>
