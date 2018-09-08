import { dispatch } from 'store'

export default () => {
    const appData = localStorage.getItem('JTEMPLATE_APP_DATA')
    if (appData) {
        const { template, fields } = JSON.parse(appData)
        if (template) {
            dispatch({ type: 'TEMPLATE_SET', template: template })
        }
        if (fields) {
            dispatch({ type: 'FIELDS_SET', fields: fields })
        }
    }
}
