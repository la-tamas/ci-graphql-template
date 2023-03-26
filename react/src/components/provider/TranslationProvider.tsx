import { FunctionComponent, ReactElement, useMemo } from 'react'
import { IntlProvider } from 'react-intl'
import useGetTranslations from '../../hooks/queries/useGetTranslations'
import { convertTranslations } from '../../utils/convertTranslations'
import LinearLoader from '../common/loaders/LinearLoader'

type TranslationProviderProps = {
    children?: ReactElement | ReactElement[] | JSX.Element
}

const TranslationProvider: FunctionComponent<TranslationProviderProps> = ({ children }) => {
    const { data, loading, error } = useGetTranslations('en-en')

    const translationMap = useMemo(() => convertTranslations(data), [data])

    if (error) {
        /** @TODO add error component */
        return null
    }

    if (loading || Object.keys(translationMap).length === 0) {
        return (
            <LinearLoader />
        )
    }

    return (
        <IntlProvider messages={translationMap} locale='ro-ro' defaultLocale='ro-ro'>
            {children}
        </IntlProvider>
    )
}

export default TranslationProvider