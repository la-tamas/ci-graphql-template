"use strict";
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["App"] = factory();
	else
		root["App"] = factory();
})(self, () => {
return (self["webpackChunkApp"] = self["webpackChunkApp"] || []).push([[179],{

/***/ 498:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Initializer),
  "library": () => (/* binding */ library)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: ./node_modules/react-dom/client.js
var client = __webpack_require__(745);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
;// CONCATENATED MODULE: ./react/src/components/error/GeneralErrorBoundary.tsx

/* eslint-disable @typescript-eslint/no-explicit-any */

class GeneralErrorBoundary extends react.Component {
    state = {
        error: null,
    };
    static getDerivedStateFromError(error) {
        return { error };
    }
    render() {
        if (this.state.error) {
            return ((0,jsx_runtime.jsx)("div", { children: this.state.error.message }));
        }
        return this.props.children;
    }
}

// EXTERNAL MODULE: ./node_modules/@apollo/client/react/context/ApolloProvider.js
var ApolloProvider = __webpack_require__(3768);
// EXTERNAL MODULE: ./node_modules/@mui/system/esm/ThemeProvider/ThemeProvider.js + 1 modules
var ThemeProvider = __webpack_require__(1807);
// EXTERNAL MODULE: ./node_modules/react-intl/lib/src/components/provider.js + 27 modules
var provider = __webpack_require__(6174);
// EXTERNAL MODULE: ./node_modules/@apollo/client/react/hooks/useQuery.js + 3 modules
var useQuery = __webpack_require__(6138);
// EXTERNAL MODULE: ./node_modules/graphql-tag/lib/index.js + 10 modules
var lib = __webpack_require__(9098);
;// CONCATENATED MODULE: ./react/src/graphql/queries/getTranslations.ts

const GET_TRANSLATIONS = lib/* gql */.Ps `
  query GetTranslations($language: String!) {
    getTranslations(language: $language) {
        code
        value
    }
  }
`;

;// CONCATENATED MODULE: ./react/src/hooks/queries/useGetTranslations.ts



const useGetTranslations = (language) => {
    const { loading, error, data, refetch } = (0,useQuery/* useQuery */.a)(GET_TRANSLATIONS, {
        variables: {
            language: language,
        },
        skip: !language
    });
    const result = data?.getTranslations;
    const reloadTranslations = (0,react.useCallback)(async (language) => {
        return await refetch({
            language
        });
    }, [refetch]);
    return {
        loading,
        error,
        data: result,
        reloadTranslations
    };
};
/* harmony default export */ const queries_useGetTranslations = (useGetTranslations);

;// CONCATENATED MODULE: ./react/src/utils/convertTranslations.ts
const defaultMap = {
    trans__default: 'empty'
};
function convertTranslations(data) {
    if (!data) {
        return defaultMap;
    }
    return data.reduce((prev, { code, value }) => Object.assign({}, { ...prev, [code]: value }), defaultMap);
}

// EXTERNAL MODULE: ./node_modules/@mui/material/Box/Box.js + 2 modules
var Box = __webpack_require__(2094);
// EXTERNAL MODULE: ./node_modules/@mui/material/LinearProgress/LinearProgress.js + 15 modules
var LinearProgress = __webpack_require__(9198);
// EXTERNAL MODULE: ./node_modules/@mui/styles/makeStyles/makeStyles.js + 33 modules
var makeStyles = __webpack_require__(1732);
;// CONCATENATED MODULE: ./react/src/components/common/loaders/linearLoader.styles.ts

const linearLoaderStyles = (0,makeStyles/* default */.Z)(() => ({
    root: {
        position: 'absolute',
        top: 0,
        width: '100%'
    },
    loader: {},
    loaderBar: {}
}), {
    name: 'LinearLoader'
});
/* harmony default export */ const linearLoader_styles = (linearLoaderStyles);

;// CONCATENATED MODULE: ./react/src/components/common/loaders/LinearLoader.tsx




const LinearLoader = () => {
    const styles = linearLoader_styles();
    return ((0,jsx_runtime.jsx)(Box/* default */.Z, { className: styles.root, children: (0,jsx_runtime.jsx)(LinearProgress/* default */.Z, { className: styles.loader, classes: {
                bar: styles.loaderBar
            } }) }));
};
/* harmony default export */ const loaders_LinearLoader = (LinearLoader);

;// CONCATENATED MODULE: ./react/src/components/provider/TranslationProvider.tsx






const TranslationProvider = ({ children }) => {
    const { data, loading, error } = queries_useGetTranslations('en-en');
    const translationMap = (0,react.useMemo)(() => convertTranslations(data), [data]);
    if (error) {
        /** @TODO add error component */
        return null;
    }
    if (loading || Object.keys(translationMap).length === 0) {
        return ((0,jsx_runtime.jsx)(loaders_LinearLoader, {}));
    }
    return ((0,jsx_runtime.jsx)(provider/* default */.Z, { messages: translationMap, locale: 'ro-ro', defaultLocale: 'ro-ro', children: children }));
};
/* harmony default export */ const provider_TranslationProvider = (TranslationProvider);

// EXTERNAL MODULE: ./node_modules/@apollo/client/core/ApolloClient.js + 37 modules
var ApolloClient = __webpack_require__(2243);
// EXTERNAL MODULE: ./node_modules/@apollo/client/cache/inmemory/inMemoryCache.js + 9 modules
var inMemoryCache = __webpack_require__(2198);
;// CONCATENATED MODULE: ./react/src/graphql/client.ts

const client_client = new ApolloClient/* ApolloClient */.f({
    uri: 'http://localhost:8080/graphql',
    cache: new inMemoryCache/* InMemoryCache */.h(),
});

// EXTERNAL MODULE: ./node_modules/@mui/material/styles/createTheme.js + 14 modules
var createTheme = __webpack_require__(9617);
;// CONCATENATED MODULE: ./react/src/theme/fontSizes.ts
const fontSize = {
    fontXXS: 8,
    fontXS: 10,
    fontSM: 12,
    fontMD: 16,
    fontXL: 20,
    fontXXL: 24,
};

;// CONCATENATED MODULE: ./react/src/theme/defaultTheme.ts

//import { colors } from './colors'

// @TODO: Insert global theme configs here
const theme = (0,createTheme/* default */.Z)({
    // @TODO: Refine custom theme colors
    // palette: {
    //     primary: {
    //         main: colors.primary,
    //         light: colors.primary,
    //     },
    //     secondary: {
    //         main: colors.secondary,
    //         light: colors.secondary,
    //     },
    //     background: {
    //         default: colors.white,
    //         paper: colors.white
    //     },
    //     action: {
    //         hover: colors.primaryActive,
    //         hoverOpacity: 0.5,
    //         focus: colors.secondaryActive,
    //         focusOpacity: 0.5,
    //     },
    //     common: {
    //         black: colors.black,
    //         white: colors.white,
    //     },
    // },
    typography: {
        htmlFontSize: 10,
        h1: {
            fontSize: fontSize.fontXXL,
        },
        h2: {
            fontSize: fontSize.fontXL,
        },
        h3: {
            fontSize: fontSize.fontMD
        },
        h4: {
            fontSize: fontSize.fontMD,
        },
        h5: {
            fontSize: fontSize.fontXS,
        },
        h6: {
            fontSize: fontSize.fontXXS
        }
    },
    components: {
    // MuiButton: {
    //     styleOverrides: {
    //         root: {
    //             borderRadius: 0,
    //         }
    //     }
    // },
    // MuiInput: {
    //     styleOverrides: {
    //         root: {
    //             borderRadius: 0,
    //         },
    //     }
    // },
    // MuiOutlinedInput: {
    //     styleOverrides: {
    //         notchedOutline: {
    //             borderRadius: 0,
    //         },
    //         root: {
    //             borderRadius: 0,
    //         }
    //     }
    // },
    // MuiCard: {
    //     styleOverrides: {
    //         root: {
    //             borderRadius: 0
    //         }
    //     }
    // },
    // MuiSvgIcon: {
    //     styleOverrides: {
    //         root: {
    //             fontSize: 'unset'
    //         }
    //     }
    // }
    }
});

// EXTERNAL MODULE: ./node_modules/react-router-dom/dist/index.js
var dist = __webpack_require__(9655);
// EXTERNAL MODULE: ./node_modules/react-router/dist/index.js
var react_router_dist = __webpack_require__(9250);
;// CONCATENATED MODULE: ./react/src/components/common/MainRouter.tsx



const MainRouter = () => {
    return ((0,jsx_runtime.jsx)(dist/* BrowserRouter */.VK, { children: (0,jsx_runtime.jsx)(react_router_dist/* Routes */.Z5, { children: (0,jsx_runtime.jsx)(react_router_dist/* Route */.AW, { path: '/', errorElement: 'Error', element: (0,jsx_runtime.jsx)(react.Suspense, { fallback: 'Loading...', children: 'Hello' }) }) }) }));
};
/* harmony default export */ const common_MainRouter = (MainRouter);

;// CONCATENATED MODULE: ./react/src/components/Root.tsx







const Root = () => {
    return ((0,jsx_runtime.jsx)(ApolloProvider/* ApolloProvider */.e, { client: client_client, children: (0,jsx_runtime.jsx)(ThemeProvider/* default */.Z, { theme: theme, children: (0,jsx_runtime.jsx)(provider_TranslationProvider, { children: (0,jsx_runtime.jsx)(common_MainRouter, {}) }) }) }));
};
/* harmony default export */ const components_Root = (Root);

;// CONCATENATED MODULE: ./react/main.app.tsx

/*eslint-disable @typescript-eslint/no-explicit-any */



const lifecycle = {
    create: async (containerId) => {
        return new Promise((resolve) => {
            const container = document.getElementById(containerId);
            const root = container && (0,client/* createRoot */.s)(container);
            root?.render((0,jsx_runtime.jsx)(GeneralErrorBoundary, { ref: () => resolve(root), children: (0,jsx_runtime.jsx)(components_Root, {}) }));
        })
            .catch((error) => {
            const container = document.getElementById(containerId);
            const root = container && (0,client/* createRoot */.s)(container);
            root?.render((0,jsx_runtime.jsxs)("div", { children: [(0,jsx_runtime.jsx)("p", { children: "Error" }), (0,jsx_runtime.jsx)("p", { children: error.message })] }));
            throw error;
        });
    },
    destroy: (root) => {
        if (root) {
            root.unmount();
        }
    }
};
class Initializer {
    static app = lifecycle;
}
const library = Object.freeze(lifecycle);


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [54], () => (__webpack_exec__(498)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ return __webpack_exports__;
/******/ }
]);
});
//# sourceMappingURL=main.app.js.map