import { dispatch } from 'store'

import { saveAppData } from 'actions'

export default (index) => {
    dispatch({ type: 'FIELDS_REMOVE_ONE', index })
    saveAppData()
}
