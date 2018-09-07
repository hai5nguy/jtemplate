import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
// import classNames from 'classnames'
import { withStyles } from '@material-ui/core'

import { Main, TopBar, ManageFields } from 'components'

const styles = {
    root: {
        // touchAction: 'none'
    },
};

class Root extends React.Component {
    render() {
        const { activeView, classes } = this.props
        return (
            <div classes={classes.root}>
                <TopBar />
                {
                    activeView === 'MANAGE_FIELDS'
                        ? <ManageFields />
                        : <Main />
                }
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    const { activeView } = state.ui
    return { activeView }
}

export default compose(
    connect(mapStateToProps),
    withStyles(styles),
)(Root)
