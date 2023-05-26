<script setup lang="ts">
import { onMounted, ref } from 'vue';
import useKonva from '../composables/useKonva';
import { scale } from './helper';

const props = withDefaults(
    defineProps<{
        title?: string;
        image: string;
        width: number;
        height: number;
    }>(),
    { width: 1920, height: 1080, title: '' }
);

const { createImg, stageRef, getImage } = useKonva();
const imageObj = ref();
onMounted(() => {
    createImg(props.image, imageObj);
});

defineExpose({ getImage });
</script>

<template>
    <div
        class="slide-container bg-gray-100 dark:bg-gray-950 border-0 border-t border-solid border-gray-200 dark:border-gray-700 w-full"
    >
        <div class="slide p-6">
            <div class="config flex flex-col p-2 group">
                <h2 class="font-bold text-xl">
                    {{ title }}
                </h2>
                <div
                    class="flex flex-col gap-5 opacity-20 group-hover:opacity-100"
                >
                    <slot name="config" />
                </div>
            </div>
            <div :id="title" class="border border-gray-400 border-solid">
                <v-stage
                    ref="stageRef"
                    :config="{ width: width / scale, height: height / scale }"
                >
                    <v-layer>
                        <v-image
                            :config="{
                                image: imageObj,
                                width: width / scale,
                                height: height / scale,
                            }"
                        />
                    </v-layer>
                    <slot />
                </v-stage>
            </div>
        </div>
    </div>
</template>
<style scoped>
.slide-container {
    text-align: left;
}
</style>
<style>
.config {
    & label {
        font-weight: 700;
    }
    & textarea,
    & input {
        @apply border border-solid dark:border-gray-700 border-gray-200 bg-gray-50 dark:bg-gray-900 px-2 py-1;
        width: calc(100% - 18px);
        box-shadow: none;
    }
}
</style>
