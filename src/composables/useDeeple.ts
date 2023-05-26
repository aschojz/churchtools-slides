import * as deepl from 'deepl-node';

const authKey = '4a9e0b57-a14b-879a-c5db-b7748266ff84:fx';

export default function useDeepl() {
    const getTranslation = async (
        string: string,
        language: deepl.TargetLanguageCode
    ) => {
        const urlDeepL =
            'https://api-free.deepl.com/v2/translate?auth_key=' +
            authKey +
            '&text=' +
            string +
            '&target_lang=' +
            language +
            '&preserve_formatting=1';
        const responseDeepL = await fetch(urlDeepL);
        const dataDeepL = await responseDeepL.json();
        const text = dataDeepL.translations[0].text;
        return text;
    };
    return { getTranslation };
}
