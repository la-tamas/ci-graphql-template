/*eslint-disable @typescript-eslint/no-explicit-any */
import { createRoot, Root } from 'react-dom/client'
import GeneralErrorBoundary from './src/components/error/GeneralErrorBoundary'
import RootComponent from './src/components/Root'

const lifecycle = {
    create: async (containerId: string): Promise<any> => {
        return new Promise((resolve: (facade?: Root) => any) => {
            const container = document.getElementById(containerId)
            const root = container && createRoot(container)

            root?.render(
                <GeneralErrorBoundary ref={() => resolve(root)}>
                    <RootComponent />
                </GeneralErrorBoundary>
            )
        })
        .catch((error) => {
            const container = document.getElementById(containerId)
            const root = container && createRoot(container)

            root?.render(
                <div>
                    <p>Error</p>
                    <p>{error.message}</p>
                </div>
            )

            throw error
        })
    },

    destroy: (root: Root | undefined | null): void => {
        if (root) {
            root.unmount()
        }
    }
}

export default class Initializer {
    public static app = lifecycle
}

export const library = Object.freeze(lifecycle)