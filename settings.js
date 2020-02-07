var
    //mapWidth		= 620;
    mapHeight		= 360;

shadowWidth		= 2;
shadowOpacity		= 0.3;
shadowColor		= "black";
shadowX			= 1;
shadowY			= 2;

iPhoneLink		= true,

    isNewWindow		= false,

    borderColor		= "#ffffff",
    borderColorOver		= "#ffffff",

    nameColor		= "#ffffff",
    nameFontSize		= "11px",
    nameFontWeight		= "bold",
    nameStroke = false,

    overDelay		= 300,

    map_data = {
        st1: {
            id: 1,
            name: "Адыгея",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st2: {
            id: 2,
            name: "Алтай",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st3: {
            id: 3,
            name: "Башкортостан",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st4: {
            id: 4,
            name: "Бурятия",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st5: {
            id: 5,
            name: "Дагестан",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st6: {
            id: 6,
            name: "Северная Осетия",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st7: {
            id: 7,
            name: "Кабардино-Балкария",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st8: {
            id: 8,
            name: "Калмыкия",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st9: {
            id: 9,
            name: "Карачаево-Черкесия",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st10: {
            id: 10,
            name: "Карелия",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st11: {
            id: 11,
            name: "Коми",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st12: {
            id: 12,
            name: "Марий Эл",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st13: {
            id: 13,
            name: "Мордовия",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st14: {
            id: 14,
            name: "Саха (Якутия)",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st15: {
            id: 15,
            name: "Ингушетия",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st16: {
            id: 16,
            name: "Татарстан",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st17: {
            id: 17,
            name: "Тыва",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st18: {
            id: 18,
            name: "Удмуртия",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st19: {
            id: 19,
            name: "Хакасия",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st20: {
            id: 20,
            name: "Чечня",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st21: {
            id: 21,
            name: "Чувашия",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st22: {
            id: 22,
            name: "Алтайский край",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st23: {
            id: 23,
            name: "Забайкальский край",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st24: {
            id: 24,
            name: "Камчатский край",
            shortname: "",
            link: "",
            comment: "City name city name<br>City name city name",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st25: {
            id: 25,
            name: "Краснодарский край",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st26: {
            id: 26,
            name: "Красноярский край",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st27: {
            id: 27,
            name: "Пермский край",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st28: {
            id: 28,
            name: "Приморский край",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st29: {
            id: 29,
            name: "Ставропольский край",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st30: {
            id: 30,
            name: "Хабаровский край",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st31: {
            id: 31,
            name: "Амурская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st32: {
            id: 32,
            name: "Архангельская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st33: {
            id: 33,
            name: "Астраханская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st34: {
            id: 34,
            name: "Белгородская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st35: {
            id: 35,
            name: "Брянская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st36: {
            id: 36,
            name: "Владимирская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st37: {
            id: 37,
            name: "Волгоградская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st38: {
            id: 38,
            name: "Вологодская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#9aad0d",
            color_map_over: "#3333aa"
        },
        st39: {
            id: 39,
            name: "Воронежская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st40: {
            id: 40,
            name: "Ивановская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st41: {
            id: 41,
            name: "Иркутская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st42: {
            id: 42,
            name: "Калининградская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st43: {
            id: 43,
            name: "Калужская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st44: {
            id: 44,
            name: "Кемеровская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st45: {
            id: 45,
            name: "Кировская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st46: {
            id: 46,
            name: "Костромская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st47: {
            id: 47,
            name: "Курганская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st48: {
            id: 48,
            name: "Курская область",
            shortname: "",
            link: "",
            comment: "<p><strong>Склады в Курской области:</strong></p><ul><li>Сельхозхимия Коренево,  +7 (47147) 21 987</li><li>Сельхозхимия Пристень, +7 (47134) 22 156    </li><li>Сельхозхимия Касторное, +7 (47157) 21 406    </li><li>Сельхозхимия Щиры, +7 (47145) 41 415 </li></ul>",
            image: "/map/sklad-kursk.jpg",
            color_map: "#7b8817",
            color_map_over: "#3333aa"
        },
        st49: {
            id: 49,
            name: "Ленинградская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#9aad0d",
            color_map_over: "#3333aa"
        },
        st50: {
            id: 50,
            name: "Липецкая область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st51: {
            id: 51,
            name: "Магаданская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st52: {
            id: 52,
            name: "Московская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st53: {
            id: 53,
            name: "Мурманская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st54: {
            id: 54,
            name: "Нижегородская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st55: {
            id: 55,
            name: "Новгородская область",
            shortname: "",
            link: "",
            comment: "<strong>Центральный офис  ООО «Еврохимсервис»</strong><br>Великий Новгород, ул. Державина, 15<br>+7 (8162) 66 50 88, 66 50 99<br><br><strong> Центральный склад  в Великом Новгороде.</strong>",
            image: "/map/sklad-office-novgorod.jpg",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st56: {
            id: 56,
            name: "Новосибирская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st57: {
            id: 57,
            name: "Омская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st58: {
            id: 58,
            name: "Оренбургская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st59: {
            id: 59,
            name: "Орловская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st60: {
            id: 60,
            name: "Пензенская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st61: {
            id: 61,
            name: "Псковская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#9aad0d",
            color_map_over: "#3333aa"
        },
        st62: {
            id: 62,
            name: "Ростовская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st63: {
            id: 63,
            name: "Рязанская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st64: {
            id: 64,
            name: "Самарская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st65: {
            id: 65,
            name: "Саратовская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st66: {
            id: 66,
            name: "Сахалинская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st67: {
            id: 67,
            name: "Свердловская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st68: {
            id: 68,
            name: "Смоленская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st69: {
            id: 69,
            name: "Тамбовская область",
            shortname: "",
            link: "",
            comment: "<p><strong>Склады в Тамбовской области:</strong></p><ul><li>Сельхозхимия  Токаревка,  +7 (47557) 24 377</li><li>Сельхозхимия  Кирсанов , +7 (47537) 34 483</li></ul>",
            image: "/map/sklad-tambov.jpg",
            color_map: "#7b8817",
            color_map_over: "#3333aa"
        },
        st70: {
            id: 70,
            name: "Тверская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#9aad0d",
            color_map_over: "#3333aa"
        },
        st71: {
            id: 71,
            name: "Томская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st72: {
            id: 72,
            name: "Тульская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st73: {
            id: 73,
            name: "Тюменская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st74: {
            id: 74,
            name: "Ульяновская область",
            shortname: "",
            link: "",
            comment: "<p><strong>Склад в Ульяновской области:</strong></p><ul><li>Сельхозхимия Цильна, +7 921-029-90-75 </li></ul>",
            image: "/map/sklad-ulyanovsk.jpg",
            color_map: "#7b8817",
            color_map_over: "#3333aa"
        },
        st75: {
            id: 75,
            name: "Челябинская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st76: {
            id: 76,
            name: "Ярославская область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st77: {
            id: 77,
            name: "Москва",
            shortname: "МСК",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st78: {
            id: 78,
            name: "Санкт-Петербург",
            shortname: "СПБ",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st79: {
            id: 79,
            name: "Еврейская автономная область",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st80: {
            id: 80,
            name: "Ненецкий",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st81: {
            id: 81,
            name: "Ханты-Мансийский",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st82: {
            id: 82,
            name: "Чукотский",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st83: {
            id: 83,
            name: "Ямало-Ненецкий",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st84: {
            id: 84,
            name: "Республика Крым",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        },
        st85: {
            id: 85,
            name: "Севастополь",
            shortname: "",
            link: "",
            comment: "",
            image: "",
            color_map: "#366CA3",
            color_map_over: "#3333aa"
        }
    };