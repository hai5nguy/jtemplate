import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'

import { setFields } from 'actions'
import { ManageField } from 'components'

const styles = {
    root: {
        position: 'relative',
    },
}

class ManageFieldList extends React.Component {
    constructor() {
        super()
        this.state = {
            dragIndex: null,
        }
        this.timeStamp = 0
        this.container = React.createRef()
    }

    fieldDragStart = index => () => {
        this.setState({ dragIndex: index })
    }

    fieldDragEnd = () => {
        this.setState({ dragIndex: null })
    }

    touchMove = (e) => {
        e.preventDefault()
        if (this.state.dragIndex === null || e.timeStamp - this.timeStamp < window.TOUCH_AND_DRAG_OVER_DELAY) return
        this.timeStamp = e.timeStamp
        if (e.touches.length === 1) {
            this.dragging(e.touches[0].clientY)
        }
    }

    dragOver = (e) => {
        e.preventDefault()
        if (this.state.dragIndex === null || e.timeStamp - this.timeStamp < window.TOUCH_AND_DRAG_OVER_DELAY) return
        this.timeStamp = e.timeStamp
        this.dragging(e.clientY)
    }

    dragging = (clientY) => {
        const rect = this.container.current.getBoundingClientRect()
        const index = Math.floor((clientY - rect.y) / window.HEIGHT_OF_FIELD)
        const { dragIndex } = this.state
        const { fields } = this.props
        if (index === dragIndex || index > fields.length - 1 || index < 0) return
        const _ = fields[index]
        fields[index] = fields[dragIndex]
        fields[dragIndex] = _
        setFields(fields)
        this.setState({ dragIndex: index })
    }

    render() {
        const { classes, fields } = this.props
        const { dragIndex } = this.state
        return (
            <div
                ref={this.container}
                className={classes.root}
                style={{ height: fields.length * window.HEIGHT_OF_FIELD }}
                onDragOver={this.dragOver}
                onTouchMove={this.touchMove}
            >
                {
                    fields.map(({ name }, i) => (
                        <ManageField
                            key={i}
                            name={name}
                            index={i}
                            dragIndex={dragIndex}
                            dragStart={this.fieldDragStart}
                            dragEnd={this.fieldDragEnd}
                        />
                    ))
                }
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
)(ManageFieldList)
