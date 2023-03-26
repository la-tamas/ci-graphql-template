import { FunctionComponent } from 'react'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from '@mui/material'
import TranslationProvider from './provider/TranslationProvider'
import { client } from '../graphql/client'
import { theme } from '../theme/defaultTheme'
import MainRouter from './common/MainRouter'

const Root: FunctionComponent = () => {
    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <TranslationProvider>
                    <MainRouter />
                </TranslationProvider>
            </ThemeProvider>
        </ApolloProvider>
    )
}

export default Root
