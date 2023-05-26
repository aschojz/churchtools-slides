<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import Container from '../components/Container.vue';
import { normalFont, scale } from '../components/helper.js';
import useKonva from '../composables/useKonva';

const props = defineProps<{
    label?: string;
    name?: string;
}>();

const { createImg } = useKonva();
const image = ref(),
    subtitle = ref('');
onMounted(() => {
    createImg('./bauchbinde.png', image);
    init();
});
watch(
    () => props.name,
    () => init()
);
const init = () => {
    if (
        props.name === 'Alexander Gimbel' ||
        props.name === 'Christian Bouillon'
    ) {
        subtitle.value = 'Pastor FeG Karlsruhe';
    } else if (props.name === 'Jorge Krist') {
        subtitle.value = 'Jugendreferent FeG Karlsruhe';
    } else {
        subtitle.value = '';
    }
};

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
                    ...normalFont,
                    fill: 'rgb(255,255,255)',
                    text: name?.toLocaleUpperCase(),
                    y: (subtitle ? 945 : 965) / scale,
                }"
            />
            <v-text
                v-if="subtitle"
                :config="{
                    ...normalFont,
                    fontSize: 34 / scale,
                    text: subtitle,
                    y: 1015 / scale,
                }"
            />
        </v-layer>
    </Container>
</template>
