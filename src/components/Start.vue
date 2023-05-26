<script setup lang="ts">
import { CTEvent } from '@churchtools/utils';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { computed, onBeforeUpdate, onMounted, ref, watch } from 'vue';
import { useStore } from '../store';
import { slides } from './config';

const store = useStore();

const events = computed(() =>
    store.events
        .filter((e) => {
            const startDate = new Date(e.startDate);
            return (
                e.calendar.domainIdentifier === '2' &&
                startDate.getHours() === 9
            );
        })
        .map((e) => ({
            ...e,
            label: `${new Date(e.startDate).toLocaleDateString('de-DE')} - ${
                e.name
            }`,
        }))
);
const selectedEvent = ref<CTEvent>();
watch(selectedEvent, () => {
    if (selectedEvent.value) {
        store.loadEvent(selectedEvent.value?.id);
    }
});

const image = ref();
onMounted(() => {
    const img = new Image();
    img.src = './slide1.jpg';
    img.onload = () => {
        image.value = img;
    };
    store.loadMasterdata();
    store.loadEvents();
});

const layouts = computed(() => {
    const layouts = slides.map((slide) => ({
        component: slide.layout,
        export: slide.export,
        props: {
            ...slide.bind,
            label: slide.label,
            language: slide.language ?? 'de',
        },
    }));
    const index = layouts.findIndex((l) => l.component === 'Band');
    if (index >= 0) {
        const bandLayout = layouts.splice(index, 1);
        return [
            ...layouts,
            ...bands.value.map((b) => ({
                ...bandLayout[0],
                export: [`3_bauchbinden/bb_${b.name?.replace(' ', '')}.png`],
                props: { ...bandLayout[0].props, name: b.name },
            })),
        ];
    }
    return layouts;
});

const stageServices = computed(() =>
    store.masterdata.services.filter((s) => s.serviceGroupId === 1)
);

const bands = ref([]);
watch(
    () => store.currentEvent,
    () => {
        bands.value = [];
        store.currentEvent.eventServices.filter((ser) => {
            if (stageServices.value.map((s) => s.id).includes(ser.serviceId)) {
                bands.value.push(ser);
            }
        });
    }
);

const generateImages = () => {
    const promises: Promise<void>[] = [];
    const zip = new JSZip();
    zip.folder('0_sonstiges');
    zip.folder('1_einladung');
    zip.folder('2_countdown');
    zip.folder('3_bauchbinden');
    zip.folder('4_ansagen');
    layoutRefs.value.map((slide, index) => {
        layouts.value[index].export.forEach(async (ex) => {
            const imgUri = await slide.containerRef?.getImage(
                ex.endsWith('png') ? 'image/png' : 'image/jpeg'
            );
            const idx = imgUri.indexOf('base64,') + 'base64,'.length; // or = 28 if you're sure about the prefix
            const content = imgUri.substring(idx);
            promises.push(zip.file(ex, content, { base64: true }));
        });
    });
    Promise.all(promises).then(() => {
        zip.generateAsync({ type: 'blob' }).then((content) => {
            saveAs(
                content,
                `${new Date(store.currentEvent.startDate)
                    .toISOString()
                    .slice(0, 10)}.zip`
            );
        });
    });
};

const layoutRefs = ref([]);
const layoutToRefs = (e) => {
    if (e) {
        layoutRefs.value.push(e);
    }
};
onBeforeUpdate(() => (layoutRefs.value = []));
</script>

<template>
    <div class="home">
        <div class="flex gap-6 p-6">
            Untertitel
            <input v-model="store.subtitle.de" placeholder="deutsch" />
            <input v-model="store.subtitle.en" placeholder="english" />
            <input v-model="store.subtitle.es" placeholder="espganol" />
        </div>
        <template v-for="(layout, index) in layouts" :key="index">
            <component
                :is="layout.component"
                v-bind="layout.props"
                :ref="layoutToRefs"
            />
        </template>
        <div
            class="flex gap-4 py-4 justify-center border-t border-gray-200 border-solid border-0 sticky bottom-0 bg-gray-50 w-full"
        >
            <select v-model="selectedEvent">
                <option v-for="e in events" :key="e.id" :value="e">
                    {{ e.label }}
                </option>
            </select>
            <button :disabled="!store.currentEvent" @click="generateImages">
                Generate Images
            </button>
        </div>
    </div>
</template>

<style>
.home {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.slide {
    display: grid;
    grid-template-columns: 300px auto;
    place-content: center;
}
</style>
