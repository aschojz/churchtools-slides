import { Ref, ref } from 'vue';
import { scale } from '../components/helper';

export default function useKonva() {
    const createImg = (src: string, variable: Ref) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            variable.value = img;
        };
    };

    const stageRef = ref();
    const getImage = async (mimeType = 'image/jpeg') => {
        const stage = stageRef.value.getStage();
        return stage.toDataURL({ mimeType, pixelRatio: scale });
    };
    return { createImg, getImage, stageRef };
}
