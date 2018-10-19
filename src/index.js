// import 'babel-polyfill';

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { Root } from 'components'

import store from 'store'

/* globals */
window.HEIGHT_OF_FIELD = 60
window.TOUCH_AND_DRAG_OVER_DELAY = 100

const App = () => (
    <Provider store={store}>
        <Root />
    </Provider>
)

ReactDOM.render(<App />, document.getElementById('app'));
