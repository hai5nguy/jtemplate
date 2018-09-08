import { dispatch } from 'store'

import { saveAppData } from 'actions'

export default (template) => {
    dispatch({ type: 'TEMPLATE_SET', template })
    saveAppData()
}
