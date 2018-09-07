import { dispatch } from 'store'

export default view => () => {
    dispatch({ type: 'UI_SET_ACTIVE_VIEW', view })
}
