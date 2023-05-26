<script setup lang="ts">
import { computed, ref } from 'vue';
import Container from '../components/Container.vue';
import {
    normalFont,
    scale,
    secondaryFont,
    titleFont,
} from '../components/helper.js';
import useChurchTools from '../composables/useChurchTools';
import { useStore } from '../store';

defineProps<{
    label?: string;
}>();

const { dayMonth } = useChurchTools();

const fontConfig = computed(() => ({
    ...normalFont,
    fill: 'rgb(255,255,255)',
    fontSize: 65 / scale,
    lineHeight: 1.3,
}));

const store = useStore();
const currentEventIndex = computed(() =>
    events.value.findIndex((e) => e.id === store.currentEvent.id)
);
const events = computed(() =>
    store.events.filter((e) => {
        const startDate = new Date(e.startDate);
        return (
            e.calendar.domainIdentifier === '2' && startDate.getHours() === 9
        );
    })
);
const nextSundays = computed(() => {
    if (!store.currentEvent) {
        return '';
    }
    const ceIndex = currentEventIndex.value;
    return `${dayMonth(events.value[ceIndex + 1]?.startDate)} – ${
        events.value[ceIndex + 1]?.name
    } \n${dayMonth(events.value[ceIndex + 2]?.startDate)} – ${
        events.value[ceIndex + 2]?.name
    }`;
});

const containerRef = ref();
defineExpose({ containerRef });
</script>

<template>
    <Container ref="containerRef" :title="label" image="./slide2.jpg">
        <template #config> </template>
        <v-layer :config="{ x: 200 / scale, y: 150 / scale }">
            <v-text
                :config="{
                    ...titleFont,
                    text: 'Gottes Segen \nfür die nächste Woche!',
                }"
            />
            <v-text
                :config="{
                    ...fontConfig,
                    text: 'God’s blessings for the next week! \n¡La bendición de Dios para la próxima semana! \nБожьего благословения на следующую неделю! \n神祝福接下来的一周',
                    y: 200 / scale,
                }"
            />
            <v-text
                :config="{
                    ...secondaryFont,
                    text: 'Nächste Gottesdienste (mit Livestream)',
                    y: 600 / scale,
                }"
            />
            <v-text
                :config="{
                    ...fontConfig,
                    lineHeight: 1,
                    text: nextSundays,
                    y: 650 / scale,
                }"
            />
        </v-layer>
    </Container>
</template>
