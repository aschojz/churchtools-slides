<script setup lang="ts">
import QRCode from 'qrcode';
import { onMounted, ref } from 'vue';
import Container from '../components/Container.vue';
import { scale } from '../components/helper.js';
import { useFonts } from '../composables/useFonts';

const props = defineProps<{
    title?: string;
    subtitle?: string;
    icon?: string;
    link?: string;
    label?: string;
}>();

const code = ref(),
    label = ref(''),
    icon = ref('\uf086'),
    link = ref(''),
    title = ref(''),
    subtitle = ref('');

onMounted(async () => {
    init();
    await generateQR(link.value);
    setTimeout(() => {
        titleHeight.value = titleRef.value?.getNode().height();
    }, 1000);
});

const titleRef = ref();
const titleHeight = ref(0);

const init = () => {
    icon.value = props.icon ?? '';
    title.value = props.title ?? '';
    subtitle.value = props.subtitle ?? '';
    label.value = props.label ?? '';
    link.value = props.link ?? '';
};

const generating = ref(false);
const generateQR = async (text: string) => {
    generating.value = true;
    try {
        const qr = new Image();
        qr.src = await QRCode.toDataURL(text);
        generating.value = false;
        code.value = qr;
    } catch (error) {
        generating.value = false;
        console.error(error);
    }
};

const { font, titleFont, fontAwesome } = useFonts();

const containerRef = ref();
defineExpose({ containerRef });
</script>

<template>
    <Container ref="containerRef" :title="label" image="./slide2.jpg">
        <template #config>
            <label>
                <div>Titel</div>
                <textarea v-model="title" rows="3" />
            </label>
            <label>
                <div>Untertitel</div>
                <textarea v-model="subtitle" rows="5" />
            </label>
            <label>
                <div>Icon (Glyph)</div>
                <input v-model="icon" />
            </label>
            <label>
                <div>QR-Code Link</div>
                <textarea v-model="link" rows="5" @blur="generateQR(link)" />
            </label>
        </template>
        <v-layer :config="{ x: 200 / scale, y: 150 / scale }">
            <v-image
                v-if="!generating"
                :config="{
                    image: code,
                    width: 400 / scale,
                    height: 400 / scale,
                    x: 950 / scale,
                }"
            />
            <v-text :config="{ ...fontAwesome(), text: icon }" />
            <v-text
                ref="titleRef"
                :config="{
                    ...titleFont(),
                    text: title,
                    y: 430 / scale,
                }"
            />
            <v-text
                :config="{
                    ...font(undefined, 0.7),
                    lineHeight: 1.1,
                    text: subtitle,
                    y: (450 + titleHeight * scale) / scale,
                }"
            />
        </v-layer>
    </Container>
</template>
