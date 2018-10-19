import { dispatch } from 'store'

import { saveAppData } from 'actions'

// import debounce from 'lodash.debounce'

export default (index, name) => {
    dispatch({ type: 'FIELDS_SET_NAME', index, name })
    saveAppData()
}
