// import cloneDeep from 'lodash.clonedeep';

const initialState = 'This is a sample template.\n\njTemplate version {versionNumber}\n\nFor {cool-dude} by {Author}\n\nNotes:\n - Best used as a phone app (click Add to Home Screen)\n - All field names, field values, and template are stored in local storage.\n - If you clear your local storage, the app defaults back to this template.'

export default (state = initialState, action) => {
    switch (action.type) {
        case 'TEMPLATE_SET': {
            return action.template
        }
        default:
            return state;
    }
};
