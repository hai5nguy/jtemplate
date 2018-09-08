// import 'babel-polyfill';

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { Root } from 'components'

// import { createMuiTheme, MuiThemeProvider, CssBaseline } from '@material-ui/core';

// import './manifest.json'


// import Routes from './app-routes';
// import './_Styles/Index.scss';


import store from 'store'


/* globals */
window.HEIGHT_OF_FIELD = 60
window.TOUCH_AND_DRAG_OVER_DELAY = 100

// const App = () => (
//     <MuiThemeProvider theme={theme}>
//         <CssBaseline /
//         <Provider store={store}>
//             <Routes />
//         </Provider>
//     </MuiThemeProvider>
// );

const App = () => (
    <Provider store={store}>
        <Root />
    </Provider>
)

ReactDOM.render(<App />, document.getElementById('app'));
