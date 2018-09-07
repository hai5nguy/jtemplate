import React from 'react'
import classNames from 'classnames'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core'

import { Field } from 'components'

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        overscrollBehavior: 'contain',
    },
    label: {
        textTransform: 'capitalize',
    },
    preview: {
        width: '49%',
        // alignSelf: 'flex-end',
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
    state = {
        message: 'This is a sample template.\n\nFirst field: {firstField}',
        previewMessage: '',
        previewing: false,
        fields: [
            { name: 'fooname11' },
            { name: 'fooname22' },
        ],
    }

    fieldChange = name => (e) => {
        const fields = { ...this.state.fields, [name]: e.currentTarget.value }
        this.setState({
            fields,
        })
    }

    compileMessage = () => {
        const { fields } = this.state
        return this.state.message.replace('{firstField}', fields.blah)
    }

    handleCopy = () => {
        navigator.clipboard.writeText(this.compileMessage())
    }

    handlePreview = () => {
        console.log('yoooo')

        const { fields } = this.state

        const message = this.state.message.replace('{firstField}', fields.blah)
        this.setState({
            previewing: !this.state.previewing,
            previewMessage: message,
        })
    }

    handleTemplateChange = (e) => {
        this.setState({
            message: e.currentTarget.value,
        })
    }

    handleFieldChange = name => (value) => {
        // const i = this.state.fields.findIndex(f => f.name === name)
        // const fields = [...this.state.fields]
        // fields[i] = { name, value }
        const fields = this.state.fields.map((f) => {
            if (f.name === name) return { name, value }
            return f
        })
        this.setState({ fields })
    }

    render() {
        const { classes } = this.props
        const { message, previewing, previewMessage, fields } = this.state
        return (
            <div className={classNames(classes.root)}>
                {
                    fields.map((f, i) => (
                        <Field key={i} {...f} onChange={this.handleFieldChange(f.name)} />
                    ))
                }
                <TextField
                    label="Template"
                    multiline
                    onChange={this.handleTemplateChange}
                    value={previewing ? previewMessage : message}
                    margin="normal"
                    InputProps={{
                        classes: {
                            root: previewing && classes.previewing,
                        },
                    }}
                />
                <div className={classNames(classes.buttonContainer)}>
                    <Button
                        className={classNames(classes.copy)}
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={this.handleCopy}
                    >
                    Copy
                    </Button>
                    <Button
                        className={classNames(classes.preview)}
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={this.handlePreview}
                    >
                    Preview
                    </Button>

                </div>
            </div>

        )
    }
}

export default withStyles(styles)(Main)
