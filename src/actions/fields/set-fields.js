import { dispatch, getState } from 'store'

import { saveAppData } from 'actions'

export default (fields) => {
    dispatch({ type: 'FIELDS_SET', fields })
    saveAppData()
}
