import React from 'react'
import { withStyles, FormControl, InputLabel, Input } from '@material-ui/core'
import { DragIndicator, Close } from '@material-ui/icons'

import { removeField, setFieldName } from 'actions'

const styles = {
    root: {
        display: 'flex',
        position: 'absolute',
        width: '100%',
        boxShadow: '#aaa 2px 2px 5px',
        borderRadius: '2px',
    },
    dragIndicator: {
        width: '2em',
        height: '1.5em',
        margin: 'auto',
        color: '#b9b9b9',
        cursor: 'move',
    },
    deleteButton: {
        color: 'red',
        width: '1.5em',
        height: '1.75em',
        fontSize: '30px',
        cursor: 'pointer',
    },
    inputContainer: {
        flexGrow: 1,
    },
    labelRoot: {
        marginTop: '3px',
        userSelect: 'none',
    },
    fieldName: {
        // fontSize: '1.4em',
    },
};

class ManageField extends React.Component {
    indicatorMouseDown = (e) => {
        e.currentTarget.parentNode.setAttribute('draggable', true)
    }

    dragEnd = (e) => {
        e.currentTarget.setAttribute('draggable', false)
        this.props.dragEnd()
    }

    closeClick = () => {
        removeField(this.props.index)
    }

    change = (e) => {
        setFieldName(this.props.index, e.currentTarget.value)
    }

    render() {
        const { classes, name, index, dragIndex, dragStart } = this.props
        return (
            <div
                className={classes.root}
                onDragStart={dragStart(index)}
                onDragEnd={this.dragEnd}
                onTouchStart={dragStart(index)}
                onTouchEnd={this.dragEnd}
                style={{
                    top: index * window.HEIGHT_OF_FIELD,
                    border: dragIndex === index ? '2px solid blue' : '',
                    background: dragIndex === index ? '#93cdff' : '#fffefe',
                }}
            >
                <DragIndicator className={classes.dragIndicator} onMouseDown={this.indicatorMouseDown} />
                <FormControl className={classes.inputContainer}>
                    <InputLabel className={classes.labelRoot} htmlFor="field">Field</InputLabel>
                    <Input id="field" className={classes.fieldName} value={name} onChange={this.change} />
                </FormControl>
                <Close className={classes.deleteButton} onClick={this.closeClick} />
            </div>
        )
    }
}

export default withStyles(styles)(ManageField)
