import type { Translation } from '../types/Translation'

type TranslationMap = Record<string, string>

const defaultMap: TranslationMap = {
    trans__default: 'empty'
}

export function convertTranslations(data?: Translation[]): TranslationMap {
    if (!data) {
        return defaultMap
    }

    return data.reduce((prev, { code, value }) => Object.assign({}, { ...prev, [code]: value }), defaultMap)
}
