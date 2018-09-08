import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withStyles, Button } from '@material-ui/core'

import { setActiveView } from 'actions'
import { AddNewField, ManageFieldList } from 'components'

const styles = {
    root: {
        padding: '5px 14px',
    },
    doneContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    doneButton: {
        minWidth: '200px',
        marginTop: '5px',
    },
};

class ManageFields extends React.Component {
    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <ManageFieldList />
                <AddNewField />
                <div className={classes.doneContainer}>
                    <Button className={classes.doneButton} variant="contained" color="primary" onClick={setActiveView('MAIN')}>Done</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { fields } = state
    return { fields }
}

export default compose(
    connect(mapStateToProps),
    withStyles(styles),
)(ManageFields)
