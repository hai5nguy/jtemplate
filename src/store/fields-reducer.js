// import cloneDeep from 'lodash.clonedeep';

const initialState = [
    { name: 'field1' },
    { name: 'fieldTwo' },
    { name: 'Field-3' }
];
export default (state = initialState, action) => {
    switch (action.type) {
        case 'FIELDS_': {
            return action.leaderboard;
        }
        default:
            return state;
    }
};
