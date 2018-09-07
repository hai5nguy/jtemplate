import { combineReducers, createStore } from 'redux'
import fields from './fields-reducer'
import ui from './ui-reducer'

const reducer = combineReducers({
    fields,
    ui,
});
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const { dispatch } = store
export default store
