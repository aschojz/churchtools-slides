<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import Container from '../components/Container.vue';
import { scale } from '../components/helper.js';
import { useFonts } from '../composables/useFonts';
import useKonva from '../composables/useKonva';

const props = defineProps<{
    label?: string;
    name?: string;
}>();

const { createImg } = useKonva();
const image = ref(),
    subtitle = ref(''),
    title = ref('');
onMounted(() => {
    createImg('./bauchbinde.png', image);
    init();
});
watch(
    () => props.name,
    () => init()
);
const init = () => {
    title.value = props.name ?? '';
    if (
        props.name === 'Alexander Gimbel' ||
        props.name === 'Christian Bouillon'
    ) {
        subtitle.value = 'Pastor FeG Karlsruhe';
    } else if (props.name === 'Jorge Krist') {
        subtitle.value = 'Jugendreferent FeG Karlsruhe';
    } else if (props.name?.includes('(')) {
        subtitle.value = props.name?.split('(')[1].split(')')[0];
        title.value = props.name?.split('(')[0];
    } else {
        subtitle.value = '';
    }
};

const { font } = useFonts();

const containerRef = ref();
defineExpose({ containerRef });
</script>

<template>
    <Container ref="containerRef" :title="label" image="./bauchbinde.png">
        <template #config>
            <label>
                Untertitel
                <input v-model="subtitle" />
            </label>
        </template>
        <v-layer :config="{ x: 150 / scale }">
            <v-text
                :config="{
                    ...font(),
                    text: title?.toLocaleUpperCase(),
                    y: (subtitle ? 945 : 965) / scale,
                }"
            />
            <v-text
                v-if="subtitle"
                :config="{
                    ...font(34, 0.7),
                    text: subtitle,
                    y: 1015 / scale,
                }"
            />
        </v-layer>
    </Container>
</template>
