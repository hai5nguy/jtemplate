import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'

import { AddCircle } from '@material-ui/icons'


import { addNewField } from 'actions'

const styles = {
    root: {
        display: 'flex',
        marginBottom: '10px',
        paddingLeft: '48px',
    },
    newFieldName: {
        flexGrow: 1,
    },
    addCircle: {
        color: 'green',
        width: '1.5em',
        height: '1.5em',
        fontSize: '30px',
        cursor: 'pointer',
    },
};

class Field extends React.Component {
    state = {
        value: '',
    }

    addClick = () => {
        addNewField({ name: this.state.value, value: '' })
        this.setState({ value: '' })
    }

    nameChange = (e) => {
        this.setState({ value: e.currentTarget.value })
    }

    keyDown = (e) => {
        if (e.keyCode === 13) {
            this.addClick()
        }
    }

    render() {
        const { classes } = this.props
        const { value } = this.state
        return (
            <div className={classes.root}>
                <Input className={classes.newFieldName} placeholder="Enter new field name" value={value} onKeyDown={this.keyDown} onChange={this.nameChange} />
                <AddCircle className={classes.addCircle} onClick={this.addClick} />
            </div>
        )
    }
}

export default withStyles(styles)(Field)
