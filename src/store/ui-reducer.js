// import cloneDeep from 'lodash.clonedeep';

const initialState = {
    // activeView: 'MANAGE_FIELDS',
    activeView: 'MAIN',
};
export default (state = initialState, action) => {
    switch (action.type) {
        case 'UI_SET_ACTIVE_VIEW': {
            return { ...state, activeView: action.view }
        }
        default:
            return state;
    }
};
