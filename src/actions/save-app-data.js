import { getState } from 'store'

import debounce from 'lodash.debounce'

export default debounce(() => {
    const { template, fields } = getState()
    const appData = { template, fields }
    localStorage.setItem('JTEMPLATE_APP_DATA', JSON.stringify(appData));
}, 1000)
