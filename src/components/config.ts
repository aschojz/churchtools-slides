export const slides = [
    {
        label: 'Predigt Titel',
        export: ['titel.jpg', '0_sonstiges/predigt_titel.jpg'],
        layout: 'Title',
        bind: {
            image: './title.jpg',
        },
    },
    {
        label: 'Countdown 1',
        export: ['2_countdown/countdown_1.jpg'],
        layout: 'Countdown1',
    },
    {
        label: 'Predigt leer',
        export: ['0_sonstiges/predigt_leer.jpg'],
        layout: 'Image',
        bind: {
            image: './slide2.jpg',
        },
    },
    {
        label: 'Übersetzung',
        export: ['2_countdown/countdown_2.jpg'],
        layout: 'Text',
        bind: {
            title: 'Translation - Traducción - перевод',
            text: [
                'Translation into English on site and YouTube link on website. \nAsk the Welcome Team.',
                'Traducción al español en el sitio y enlace a YouTube en el sitio web. \nPregunte al equipo de bienvenida.',
                'Перевод на русский язык только на месте. \nСпросите команду приветствия.',
            ],
        },
    },
    {
        label: 'Spende',
        export: ['2_countdown/countdown_3.jpg', '5_loop/07_spenden.jpg'],
        layout: 'Donation',
    },
    {
        label: 'Countdown 4',
        export: ['2_countdown/countdown_4.jpg'],
        layout: 'Image',
        bind: {
            image: './countdown_4.jpg',
        },
    },
    {
        label: 'Kontakt',
        export: ['5_loop/03_kontakt.jpg'],
        layout: 'QRCode',
        bind: {
            title: 'Lust Gemeinde \nmehr kennenzulernen?',
            subtitle:
                'Hinter dem QR-Code findest Du unseren \nNewsletter, Zugang zum Intranet, …',
            link: 'https://feg-karlsruhe.church.tools/grouphomepage/nEGUWeNLhlzcW19tdPmBDThNVZreAAoR?embedded=true',
            icon: '\uf0c0',
        },
    },
    {
        label: '06_hauskreise',
        export: ['5_loop/06_kontakt.jpg'],
        layout: 'QRCode',
        bind: {
            title: 'Auf der Suche \nnach Gemeinschaft?',
            subtitle:
                'Dann melde Dich unter \nhauskreissuchmaschine@feg-karlsruhe.de',
            link: 'mailto:hauskreissuchmaschine@feg-karlsruhe.de?subject=Ich suche einen Hauskreis',
            icon: '\uf086',
        },
    },
    {
        label: '08_gebet&segen',
        export: ['5_loop/08_gebet&segen.jpg'],
        layout: 'QRCode',
        bind: {
            title: 'Gebet & Segen',
            subtitle:
                'Direkt vor Ort oder schicke Deine \npersönlichen Gebetsanliegen an \ngebetundsegen@feg-karlsruhe.de',
            link: 'mailto:gebetundsegen@feg-karlsruhe.de',
            icon: '\uf684',
        },
    },
    {
        label: '09_abschluss',
        export: ['5_loop/09_abschluss.jpg'],
        layout: 'NextSundays',
    },
    {
        label: 'Bauchbinde',
        export: ['3_bauchbinden/bb_*.jpg'],
        layout: 'Band',
    },
    {
        label: 'Podcast Predigt',
        export: ['0_sonstiges/podcast_predigt.jpg'],
        layout: 'Podcast',
    },
    {
        label: 'Insta DE',
        language: 'de',
        export: ['1_einladung/instagram-de.jpg'],
        layout: 'Instagram',
        bind: {
            title: 'Gottesdienst',
            place: 'Live Am Wald 2  ·  online',
            time: '9:30 & 11:15 Uhr',
        },
    },
    {
        label: 'Insta EN',
        language: 'en',
        export: ['1_einladung/instagram-en.jpg'],
        layout: 'Instagram',
        bind: {
            title: 'church service',
            place: 'Live Am Wald 2  ·  online',
            time: '9:30 & 11:15 AM',
        },
    },
    {
        label: 'Insta ES',
        language: 'es',
        export: ['1_einladung/instagram-es.jpg'],
        layout: 'Instagram',
        bind: {
            title: 'servicio dominical',
            place: 'Live Am Wald 2  ·  online',
            time: '9:30 & 11:15 AM',
        },
    },
    // {
    //     label: 'seelsorge',
    //     export: ['0_sonstiges/seelsorge.jpg'],
    //     layout: 'QRCode',
    //     bind: {
    //         title: 'Du brauchst \neinen Ansprechpartner?',
    //         subtitle:
    //             'Bleib nicht alleine und sprich \nmit jemandem seelsorge@feg-karlsruhe.de',
    //         link: 'mailto:seelsorge@feg-karlsruhe.de',
    //         icon: '\uf500',
    //     },
    // },
    // {
    //     label: 'podcast',
    //     export: ['0_sonstiges/podcast.jpg'],
    //     layout: 'QRCode',
    //     bind: {
    //         title: 'Kennst du schon den FeG Podcast?',
    //         subtitle:
    //             'Predigten nachhören und weiterführende \nGespräche zum Thema mit spannenden Gästen. \nAuf allen gängigen Plattformen zu finden.',
    //         link: 'https://fegkarlsruhe.podbean.com/',
    //         icon: '\uf2ce',
    //     },
    // },
];
