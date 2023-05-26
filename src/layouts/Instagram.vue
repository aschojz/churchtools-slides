<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import Container from '../components/Container.vue';
import { condensedFont, scale } from '../components/helper.js';
import useChurchTools from '../composables/useChurchTools';
import useKonva from '../composables/useKonva';
import { useStore } from '../store';

const props = defineProps<{
    title?: string;
    time?: string;
    place?: string;
    label?: string;
    language?: keyof typeof store.subtitle;
}>();

const store = useStore();
const { createImg } = useKonva();
const cross = ref(),
    youtube = ref(),
    language = ref<keyof typeof store.subtitle>('de'),
    place = ref(''),
    time = ref(''),
    title = ref(''),
    subtitle = ref('');

onMounted(async () => {
    init();
    createImg('./cross.svg', cross);
    createImg('./youtube.svg', youtube);
    setTimeout(() => {
        titleHeight.value = titleRef.value?.getNode().height();
    }, 1000);
});

watch([() => store.subtitle.de, () => store.subtitle.en], () => init());

const titleRef = ref();
const titleHeight = ref(0);

const init = () => {
    title.value = props.title ?? '';
    subtitle.value = store.subtitle[language.value]
        ? store.subtitle[language.value]
        : store.subtitle['de'];
    place.value = props.place ?? '';
    time.value = props.time ?? '';
    language.value = props.language ?? 'de';
};

const { dayMonth } = useChurchTools();

const date = computed(() => dayMonth(store.currentEvent?.startDate));

const containerRef = ref();
defineExpose({ containerRef });
</script>

<template>
    <Container
        ref="containerRef"
        :title="label"
        image="./instagram.jpg"
        :width="1080"
        :height="1920"
    >
        <template #config>
            <label>
                <div>Untertitel</div>
                <textarea v-model="subtitle" rows="5" />
            </label>
        </template>
        <v-layer>
            <v-image
                :config="{
                    image: cross,
                    width: 100 / scale,
                    height: 100 / scale,
                    x: 840 / scale,
                    y: 100 / scale,
                }"
            />
            <v-image
                :config="{
                    image: youtube,
                    opacity: 0.7,
                    width: 300 / scale,
                    height: 210 / scale,
                    y: 1450 / scale,
                    x: 140 / scale,
                }"
            />
        </v-layer>
        <v-layer :config="{ x: 140 / scale, y: 1250 / scale }">
            <v-text
                ref="titleRef"
                :config="{
                    fontFamily: 'MyriadPro-Light',
                    fill: 'rgba(255,255,255,0.9)',
                    text: subtitle,
                    fontSize: 65 / scale,
                    y: 0 / scale,
                }"
            />
        </v-layer>
        <v-layer :config="{ x: 510 / scale, y: 1450 / scale }">
            <v-text
                ref="titleRef"
                :config="{
                    ...condensedFont,
                    text: title,
                    fontSize: 90 / scale,
                    y: 0 / scale,
                }"
            />
            <v-text
                :config="{
                    fontFamily: 'MyriadPro-LightCond',
                    fontSize: 60 / scale,
                    fill: 'rgba(255,255,255,0.75)',
                    text: `${date} - ${time}`,
                    y: 90 / scale,
                }"
            />
            <v-text
                :config="{
                    fontFamily: 'MyriadPro-LightCond',
                    fontSize: 50 / scale,
                    fill: 'rgba(255,255,255,0.75)',
                    text: place,
                    y: 160 / scale,
                }"
            />
        </v-layer>
    </Container>
</template>
