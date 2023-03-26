import { FunctionComponent } from 'react'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import linearLoaderStyles from './linearLoader.styles'

const LinearLoader: FunctionComponent = () => {
    const styles = linearLoaderStyles()

    return (
        <Box className={styles.root}>
            <LinearProgress
                className={styles.loader}
                classes={{
                    bar: styles.loaderBar
                }}
            />
        </Box>
    )
}

export default LinearLoader
