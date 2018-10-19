// import cloneDeep from 'lodash.clonedeep';

const initialState = [
    { name: 'cool-dude', value: 'Joshua' },
    { name: 'Author', value: 'Hai Nagooyen' },
    { name: 'versionNumber', value: '1.0' },
];
export default (state = initialState, action) => {
    switch (action.type) {
        case 'FIELDS_SET': {
            return [...action.fields]
        }
        case 'FIELDS_SET_NAME': {
            const fields = [...state]
            const { index, name } = action
            fields[index].name = name
            return fields
        }
        case 'FIELDS_SET_VALUE': {
            const fields = [...state]
            const { index, value } = action
            fields[index].value = value
            return fields
        }
        case 'FIELDS_ADD_NEW': {
            return [...state, action.field]
        }
        case 'FIELDS_REMOVE_ONE': {
            const fields = [...state]
            fields.splice(action.index, 1)
            return fields
        }
        default:
            return state;
    }
};
