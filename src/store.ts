import { churchtoolsClient } from '@churchtools/churchtools-client';
import { CTEvent } from '@churchtools/utils';
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';

export const useStore = defineStore('main', () => {
    const events = ref<CTEvent[]>([]);
    const loadEvents = async () => {
        const result = await churchtoolsClient.get<CTEvent[]>(`/events`);
        events.value = result;
    };

    const currentEvent = ref();
    const loadEvent = async (id: number) => {
        currentEvent.value = await churchtoolsClient.get(`/events/${id}`);
    };

    const masterdata = ref();
    const loadMasterdata = async () => {
        masterdata.value = await churchtoolsClient.get('/event/masterdata');
    };

    const subtitle = reactive({
        de: 'Pfingsten',
        en: '',
        es: '',
    });
    const subtitleIsTitle = ref(true);

    const color = ref('69,26,3');

    return {
        subtitleIsTitle,
        subtitle,
        loadEvents,
        events,
        loadEvent,
        currentEvent,
        loadMasterdata,
        masterdata,
        color,
    };
});
