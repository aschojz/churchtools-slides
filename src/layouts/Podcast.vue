<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import Container from '../components/Container.vue';
import { normalFont, scale } from '../components/helper.js';
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
                :config="{
                    ...normalFont,
                    fontSize: 100 / scale,
                    fill: 'rgb(255,255,255)',
                    fontFamily: 'MyriadPro-Light',
                    text: subtitle,
                }"
            />
        </v-layer>
    </Container>
</template>
