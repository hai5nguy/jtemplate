import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
// import classNames from 'classnames'

import { withStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'

// import debounce from 'lodash.debounce'


import { DragIndicator, Close, AddCircle } from '@material-ui/icons'


import { setActiveView } from 'actions'


// import { Main, TopBar, ManageFields } from 'components'

const HEIGHT_OF_FIELD = 60
const TOUCH_AND_DRAG_OVER_DELAY = 100

const styles = {
    root: {
        padding: '5px 14px',
    },
    fieldContainer: {
        // border: '1px solid green',
        // padding: 5,
        position: 'relative',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        // background: 'red',
        zIndex: -2,
    },
    fieldRoot: {
        // background: '#ccc',
        // border: '1px solid #aaa',
        display: 'flex',
        position: 'absolute',
        width: '100%',
        // background: '#eaeaea',
        boxShadow: '#aaa 2px 2px 5px',
        borderRadius: '2px',
    },
    dragIndicator: {
        // background: 'red',
        width: '2em',
        height: '1.5em',
        margin: 'auto',
        color: '#b9b9b9',

    },
    delete: {
        color: 'red',
        width: '1.5em',
        height: '1.75em',
        fontSize: '30px',
    },
    addContainer: {
        display: 'flex',
        // background: 'yellow',
        marginBottom: '10px',
    },
    newFieldName: {
        // fontSize: '1.4em',
        flexGrow: 1,

        // background: 'red',
    },
    addCircle: {
        color: 'green',
        width: '1.5em',
        height: '1.5em',
        fontSize: '30px',
    },
    formControl: {
        flexGrow: 1,
    },
    labelRoot: {
        marginTop: '3px',
        userSelect: 'none',
    },
    fieldName: {
        // fontSize: '1.4em',
    },
    doneButton: {
        fontSize: '1.4em',
        minWidth: '200px',
        minWeight: '60px',
    },
};

class Field extends React.Component {
    constructor() {
        super()
        this.root = React.createRef()
    }

    // componentDidMount() {
    //     console.log('componentDidMount', this.props.index * HEIGHT_OF_FIELD)

    //     // this.root.current.style.top = `${this.props.index * HEIGHT_OF_FIELD}px`

    //     this.root.current.style.transition = 'top 3s ease-in-out'
    //     this.root.current.style.top = '0px'
    //     // this.root.current.style.top = `${this.props.index * HEIGHT_OF_FIELD}px`


    //     setTimeout(() => {
    //         this.root.current.style.top = `${this.props.index * HEIGHT_OF_FIELD}px`
    //         // this.root.current.style.top = '300px'
    //     }, 0)
    // }

    // componentDidUpdate() {
    //     console.log('componentDidUpdate', this.props.index * HEIGHT_OF_FIELD)

    //     this.root.current.style.transition = 'top 3s ease-in-out'
    //     this.root.current.style.top = '0px'
    //     // this.root.current.style.top = `${this.props.index * HEIGHT_OF_FIELD}px`


    //     setTimeout(() => {
    //         this.root.current.style.top = `${this.props.index * HEIGHT_OF_FIELD}px`
    //         // this.root.current.style.top = '300px'
    //     }, 0)
    // }

    render() {
        const { classes, name, index, dragIndex, indicatorMouseDown, fieldDragStart, fieldDragEnd, fieldTouchStart, fieldTouchMove } = this.props
        console.log('render')
        return (
            <div
                ref={this.root}
                className={classes.fieldRoot}
                onDragStart={fieldDragStart(index)}
                onDragEnd={fieldDragEnd}
                onTouchStart={fieldDragStart(index)}
                onTouchEnd={fieldDragEnd}
                // onTouchMove={fieldTouchMove}
                style={{
                    top: index * HEIGHT_OF_FIELD,
                    border: dragIndex === index ? '2px solid blue' : '',
                    // opacity: dragIndex === index ? '0.3' : '1',
                    background: dragIndex === index ? '#93cdff' : '#fffefe',
                }}
            >
                <DragIndicator className={classes.dragIndicator} onMouseDown={indicatorMouseDown} />
                <FormControl className={classes.formControl}>
                    <InputLabel classes={{ root: classes.labelRoot }} htmlFor="field">Field</InputLabel>
                    <Input id="field" className={classes.fieldName} value={name} />
                </FormControl>
                <Close className={classes.delete} />
            </div>
        )
    }
}

class FieldsContainer extends React.Component {
    constructor(props) {
        super()
        this.state = {
            fields: props.fields,
            dragIndex: null,
        }
        this.timeStamp = 0
        this.container = React.createRef()
    }

    componentDidUpdate() {
        console.log('componentDidUpdate')
    }

    indicatorMouseDown = (e) => {
        e.currentTarget.parentNode.setAttribute('draggable', true)
    }

    fieldDragStart = index => () => {
        this.setState({ dragIndex: index })
    }

    fieldDragEnd = (e) => {
        e.currentTarget.setAttribute('draggable', false)
        this.setState({ dragIndex: null })
    }

    containerTouchMove = (e) => {
        e.stopPropagation()
        if (this.state.dragIndex === null || e.timeStamp - this.timeStamp < TOUCH_AND_DRAG_OVER_DELAY) return
        this.timeStamp = e.timeStamp
        if (e.touches.length === 1) {
            this.fieldDragging(e.touches[0].clientY)
        }
    }

    fieldDragging = (clientY) => {
        // console.log('clientY', clientY)
        const rect = this.container.current.getBoundingClientRect()

        const index = Math.floor((clientY - rect.y) / HEIGHT_OF_FIELD)


        const { fields, dragIndex } = this.state

        console.log('index', index, '  dragIndex', dragIndex)

        if (index === dragIndex || index > fields.length - 1 || index < 0) return

        const _ = fields[index]
        fields[index] = fields[dragIndex]
        fields[dragIndex] = _

        this.setState({ fields, dragIndex: index })
    }

    containerDragOver = (e) => {
        e.stopPropagation()
        if (this.state.dragIndex === null || e.timeStamp - this.timeStamp < TOUCH_AND_DRAG_OVER_DELAY) return
        this.timeStamp = e.timeStamp
        this.fieldDragging(e.clientY)
    }

    fieldTouchStart = (e) => {
        e.stopPropagation()
        // console.log('fieldTouchStart', e)
        console.log('fieldTouchStart', e.currentTarget)
    }

    fieldTouchMove = (e) => {
        // console.log('fieldTouchMove', e.touches[0])
        // console.log('fieldTouchMove', e.touches[0])
    }

    render() {
        const { classes } = this.props
        const { fields, dragIndex } = this.state
        return (
            <div ref={this.container} className={classes.fieldContainer} style={{ height: fields.length * HEIGHT_OF_FIELD }} onDragOver={this.containerDragOver} onTouchMove={this.containerTouchMove}>
                {
                    fields.map(({ name }, i) => (
                        <Field
                            key={i}
                            classes={classes}
                            name={name}
                            index={i}
                            dragIndex={dragIndex}
                            fieldDragStart={this.fieldDragStart}
                            fieldDragEnd={this.fieldDragEnd}
                            fieldTouchStart={this.fieldTouchStart}
                            indicatorMouseDown={this.indicatorMouseDown}
                        />
                    ))
                }
            </div>
        )
    }
}

class ManageFields extends React.Component {
    constructor(props) {
        super()
        this.overlay = React.createRef()
    }

    fieldContainerDragOver = (e) => {
        // console.log('e', e)
    }

    fieldDrag = () => {
        this.overlay.current.style.zIndex = 1;
    }

    render() {
        const { classes, fields } = this.props
        return (
            <div className={classes.root}>
                <FieldsContainer classes={classes} fields={fields} />
                <div className={classes.addContainer}>
                    {/* <TextField
                        classes={{

                        }}
                        placeholder="Enter new field name"
                        margin="normal"
                    /> */}

                    <Input className={classes.newFieldName} placeholder="Enter new field name" />

                    <AddCircle className={classes.addCircle} />
                </div>

                <Button
                    className={classes.doneButton}
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={setActiveView('MAIN')}
                >
                    Done
                </Button>

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
