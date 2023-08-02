import {createI18n, type I18nOptions} from 'vue-i18n';

import en from "./en.json";

export type MessageSchemaBn = typeof en;
export type MessageSchemaEn = typeof en;
export type AvailableLanguagesType = 'bn' | 'en';

const options: I18nOptions = {
    legacy: false,
    globalInjection: true,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en
    },
}

export default createI18n<false, typeof options>(options);
