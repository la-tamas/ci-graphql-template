import { useCallback } from 'react';
import { useQuery } from '@apollo/client'
import { GET_TRANSLATIONS } from '../../graphql/queries/getTranslations'
import type { Translation } from '../../types/Translation'

const useGetTranslations = (language: string) => {
    const { loading, error, data, refetch } = useQuery(GET_TRANSLATIONS, {
        variables: {
            language: language,
        },
        skip: !language
    })

    const result = data?.getTranslations as Translation[]

    const reloadTranslations = useCallback(async (language: string) => {
        return await refetch({
            language
        })
    }, [refetch])

    return {
        loading,
        error,
        data: result,
        reloadTranslations
    }
}

export default useGetTranslations