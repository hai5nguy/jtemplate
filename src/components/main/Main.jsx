import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core'

import { setTemplate } from 'actions'
import { MainField } from 'components'


const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '5px',
    },
    template: {
    },
    previewButton: {
        width: '49%',
    },
    copy: {
        width: '49%',
        // alignSelf: 'flex-start',
    },
    previewing: {
        background: '#EFEFEF',
    },
    buttonContainer: {
        display: 'flex',
        maxWidth: 500,
        justifyContent: 'space-between',
    },
};

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            template: props.template,
            message: '',
            previewing: false,
        }
    }

    copyClick = () => {
        navigator.clipboard.writeText(this.state.message)
    }

    replaceAll = (str, oldStr, newStr) => {
        let s1 = str
        let s2 = s1.replace(oldStr, newStr)
        while (s1 !== s2) {
            s1 = s2
            s2 = s1.replace(oldStr, newStr)
        }
        return s2
    }

    previewClick = () => {
        const previewing = !this.state.previewing
        const state = { previewing }
        if (previewing) {
            let message = this.state.template
            this.props.fields.forEach(({ name, value }) => {
                message = this.replaceAll(message, `{${name}}`, value)
            })
            state.message = message
        }
        this.setState(state)
    }

    handleTemplateChange = (e) => {
        const template = e.currentTarget.value
        this.setState({ template })
    }

    handleTemplateBlur = () => {
        setTemplate(this.state.template)
    }

    render() {
        const { classes, fields } = this.props
        const { previewing, message, template } = this.state
        return (
            <div className={classNames(classes.root)}>
                {
                    fields.map((f, i) => (<MainField key={i} index={i} {...f} />))
                }
                <TextField
                    className={classes.template}
                    label="Template"
                    multiline
                    margin="normal"
                    onChange={this.handleTemplateChange}
                    onBlur={this.handleTemplateBlur}
                    value={previewing ? message : template}
                    InputProps={{
                        classes: {
                            root: previewing && classes.previewing,
                        },
                    }}
                    disabled={previewing}
                />
                <div className={classNames(classes.buttonContainer)}>
                    <Button className={classNames(classes.copy)} size="large" variant="contained" color="primary" onClick={this.copyClick}>Copy</Button>
                    <Button className={classes.previewButton} size="large" variant="contained" color="primary" onClick={this.previewClick}>
                        { previewing ? 'Edit' : 'Preview' }
                    </Button>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    const { fields, template } = state
    return { fields, template }
}

export default compose(
    connect(mapStateToProps),
    withStyles(styles),
)(Main)
