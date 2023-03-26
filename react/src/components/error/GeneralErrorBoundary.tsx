/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ReactNode } from 'react'

export default class GeneralErrorBoundary extends Component<{children?: React.ReactElement | JSX.Element | React.ReactElement[]}, { error: any }> {
    state: {
        error: any
    } = {
        error: null,
    }

    public static getDerivedStateFromError(error: any): { error: any } {
        return { error }
    }

    public render(): ReactNode {
        if(this.state.error) {
            return (
                <div>
                    {this.state.error.message}
                </div>
            )
        }

        return this.props.children;
    }
}