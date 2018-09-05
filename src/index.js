// import 'babel-polyfill';

import React from 'react'
import ReactDOM from 'react-dom'

import { Main } from 'components'

// import { Provider } from 'react-redux';
// import { createMuiTheme, MuiThemeProvider, CssBaseline } from '@material-ui/core';

// import './manifest.json'


// import Routes from './app-routes';
// import './_Styles/Index.scss';


// import store from './Store';

// const App = () => (
//     <MuiThemeProvider theme={theme}>
//         <CssBaseline />
//         <Provider store={store}>
//             <Routes />
//         </Provider>
//     </MuiThemeProvider>
// );

const App = () => (
    <div>
        <Main />
    </div>
)

ReactDOM.render(<App />, document.getElementById('app'));
