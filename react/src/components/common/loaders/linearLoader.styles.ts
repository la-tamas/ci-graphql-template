import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

type LinearLoaderClasses = 'root' | 'loader' | 'loaderBar'

const linearLoaderStyles = makeStyles<Theme, object, LinearLoaderClasses>(
    () => ({
        root: {
            position: 'absolute',
            top: 0,
            width: '100%'
        },
        loader: {

        },
        loaderBar: {

        }
    }),
    {
        name: 'LinearLoader'
    }
)

export default linearLoaderStyles