import { getState } from 'store'

export default () => {
    const { template, fields } = getState()
    const appData = { template, fields }
    localStorage.setItem('JTEMPLATE_APP_DATA', JSON.stringify(appData));
}
