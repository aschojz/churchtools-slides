import { scale } from '../components/helper';
import { useStore } from '../store';

export const useFonts = () => {
    const fontAwesome = (size = 300, opacity = 0.7, style = 300) => ({
        fill: `rgba(${store.color}, ${opacity})`,
        fontFamily: '"Font Awesome 6 Pro"',
        fontStyle: style,
        fontSize: size / scale,
    });
    const fontAwesomeBrands = (size = 300, opacity = 0.7, style = 300) => ({
        fill: `rgba(${store.color}, ${opacity})`,
        fontFamily: "'FontAwesome6Brands-Regular', 'Font Awesome 6 Brands'",
        fontStyle: style,
        fontSize: size / scale,
    });
    const store = useStore();
    const fontStyles = {
        light: 'MyriadPro-Light',
        regular: 'Myriad Pro',
        bold: 'MyriadPro-Bold',
        'light-condensed': 'MyriadPro-LightCond',
        condensed: 'MyriadPro-Cond',
        'bold-condensed': 'MyriadPro-BoldCond',
    };
    const font = (
        size = 72,
        opacity = 1,
        style: keyof typeof fontStyles = 'regular'
    ) => {
        return {
            fill: `rgba(${store.color}, ${opacity})`,
            fontFamily: fontStyles[style],
            fontSize: size / scale,
        };
    };

    const titleFont = (size = 87, opacity = 1) => font(size, opacity, 'bold');
    const primaryFont = (size = 62, opacity = 1) =>
        font(size, opacity, 'bold-condensed');
    const secondaryFont = (size = 24, opacity = 0.5) =>
        font(size, opacity, 'bold');
    return {
        font,
        titleFont,
        secondaryFont,
        primaryFont,
        fontAwesome,
        fontAwesomeBrands,
    };
};
