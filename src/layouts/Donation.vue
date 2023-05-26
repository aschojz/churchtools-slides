<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import Container from '../components/Container.vue';
import { scale, titleFont } from '../components/helper.js';
import useKonva from '../composables/useKonva';
import { useStore } from '../store';

const store = useStore();
watch(
    () => store.currentEvent,
    () => {
        initServices();
    }
);

const donationServices = computed(() =>
    store.masterdata.services.filter((s) => s.serviceGroupId === 12)
);

const initServices = () => {
    store.currentEvent?.eventServices.forEach((ser) => {
        const d = donationServices.value.find((s) => {
            return s.id === ser.serviceId;
        });
        if (d) {
            donation.value = d.name.replace('Stichwort: ', '');
        }
    });
};

const { createImg } = useKonva();
const donationImage = ref(),
    donation = ref('');
onMounted(() => {
    createImg('./donation.png', donationImage);
});

const containerRef = ref();
defineExpose({ containerRef });
</script>

<template>
    <Container ref="containerRef" :title="'Spende'" image="./slide2.jpg">
        <template #config> </template>
        <v-layer :config="{ x: 200 / scale, y: 150 / scale }">
            <v-text
                :config="{
                    ...titleFont,
                    fontSize: 70 / scale,
                    text: `Mit Deiner Spende unterstützt Du: \n${donation}`,
                }"
            />
            <v-image
                :config="{
                    image: donationImage,
                    width: 1410 / scale,
                    height: 625 / scale,
                    y: 200 / scale,
                }"
            />
        </v-layer>
    </Container>
</template>
