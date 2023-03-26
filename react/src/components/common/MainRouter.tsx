import { FunctionComponent, Suspense } from 'react'
import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom'

const MainRouter: FunctionComponent = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route
                    path={'/'}
                    errorElement={'Error'}
                    element={
                        <Suspense fallback={'Loading...'}>
                            {'Hello'}
                        </Suspense>
                    }
                /> 
            </Switch>
        </BrowserRouter>
    )
}

export default MainRouter