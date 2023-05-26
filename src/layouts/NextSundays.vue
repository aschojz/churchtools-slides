<script setup lang="ts">
import { churchtoolsClient } from '@churchtools/churchtools-client';
import { computed, ref, watch } from 'vue';
import Container from '../components/Container.vue';
import { scale } from '../components/helper.js';
import useChurchTools from '../composables/useChurchTools';
import { useFonts } from '../composables/useFonts';
import { useStore } from '../store';

defineProps<{
    label?: string;
}>();

const { dayMonth } = useChurchTools();

const { font, titleFont, secondaryFont } = useFonts();
const fontConfig = computed(() => ({
    ...font(65),
    lineHeight: 1.3,
}));

const store = useStore();
const currentEventIndex = computed(() =>
    events.value.findIndex((e) => e.id === store.currentEvent?.id)
);
const events = computed(() =>
    store.events.filter((e) => {
        const startDate = new Date(e.startDate);
        return (
            e.calendar.domainIdentifier === '2' && startDate.getHours() === 9
        );
    })
);
watch(currentEventIndex, () => init());
const event1 = ref();
const event2 = ref();
const init = async () => {
    const ceIndex = currentEventIndex.value;
    const e1 = events.value[ceIndex + 1];
    const e2 = events.value[ceIndex + 2];
    if (e1 && e2) {
        event1.value = await churchtoolsClient.get(`/events/${e1.id}`);
        event2.value = await churchtoolsClient.get(`/events/${e2.id}`);
    }
};
const nextSundays = computed(() => {
    if (!store.currentEvent) {
        return '';
    }
    return `${transformEvent(event1.value)}\n${transformEvent(event2.value)}`;
});

const transformEvent = (event: any) => {
    const names = (event?.name ?? '').split('•').slice(0, 2);
    if (names.length === 1 && names[0] === 'Gottesdienst') {
        let sermon =
            event?.eventServices.find((s) => s.serviceId === 1)?.name ?? '';
        sermon = sermon.split('(')[0].trim();
        names.push(`mit ${sermon}`);
    }
    return `${dayMonth(event?.startDate)} – ${names.join(' • ')}`;
};

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
                    ...secondaryFont(),
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
