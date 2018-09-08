import { dispatch } from 'store'

import { saveAppData } from 'actions'

export default (field) => {
    dispatch({ type: 'FIELDS_ADD_NEW', field })
    saveAppData()
}
