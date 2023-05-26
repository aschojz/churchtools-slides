<script setup lang="ts">
import { ref, watch } from 'vue';
import Container from '../components/Container.vue';
import {
    normalFont,
    primaryFont,
    scale,
    secondaryFont,
} from '../components/helper.js';
import { useStore } from '../store.js';

defineProps<{
    label?: string;
}>();

const sermonServiceId = 1;
const moderationServiceId = 3;
const worhsipServiceId = 9;

const store = useStore();

watch(
    () => store.currentEvent,
    () => {
        initServices();
    }
);

const initServices = () => {
    sermon.value =
        store.currentEvent?.eventServices.find(
            (s) => s.serviceId === sermonServiceId
        )?.name ?? '';
    moderation.value =
        store.currentEvent?.eventServices.find(
            (s) => s.serviceId === moderationServiceId
        )?.name ?? '';
    worship.value =
        store.currentEvent?.eventServices.find(
            (s) => s.serviceId === worhsipServiceId
        )?.name ?? '';
};
const sermon = ref(''),
    moderation = ref(''),
    worship = ref('');

const containerRef = ref();
defineExpose({ containerRef });
</script>

<template>
    <Container ref="containerRef" :title="label" image="./slide1.jpg">
        <template #config> </template>
        <v-layer :config="{ x: 200 / scale, y: 500 / scale }">
            <v-text
                :config="{
                    ...normalFont,
                    fill: 'rgba(255, 255, 255)',
                    text: store.subtitle.de,
                    fontFamily: 'MyriadPro-Light',
                    fontSize: 48 / scale,
                    y: -110,
                }"
            />
            <v-text
                :config="{
                    ...primaryFont,
                    text: moderation,
                }"
            />
            <v-text
                :config="{
                    ...secondaryFont,
                    text: 'Moderation    Moderación    На модерации    主持',
                    y: 70 / scale,
                }"
            />
            <v-text
                :config="{
                    ...primaryFont,
                    text: sermon,
                    y: 170 / scale,
                }"
            />
            <v-text
                :config="{
                    ...secondaryFont,
                    text: 'Predigt    Sermon    Prédica    проповедь    布道',
                    y: 240 / scale,
                }"
            />
            <v-text
                :config="{
                    ...primaryFont,
                    text: worship,
                    y: 340 / scale,
                }"
            />
            <v-text
                :config="{
                    ...secondaryFont,
                    text: 'Lobpreis    Worship    Adoración    хвалить    敬拜',
                    y: 410 / scale,
                }"
            />
        </v-layer>
    </Container>
</template>
