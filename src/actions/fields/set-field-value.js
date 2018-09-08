import { dispatch } from 'store'

import { saveAppData } from 'actions'

export default (index, value) => {
    dispatch({ type: 'FIELDS_SET_VALUE', index, value })
    saveAppData()
}
