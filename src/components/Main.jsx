import React from 'react'
import classNames from 'classnames'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core'

import { AppDrawer, Field, TopBar } from 'components'

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        overscrollBehavior: 'contain',
    },
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'green',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
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
            <div className={classNames(classes.container)}>
                <AppDrawer />
                {
                    fields.map((f, i) => (
                        <Field key={i} {...f} onChange={this.handleFieldChange(f.name)} />
                    ))
                }

                {/* <TextField
                    id="name"
                    label="Name"
                    //   className={classes.textField}
                    value={fields.blah}
                    onChange={this.fieldChange('blah')}
                    margin="normal"
                />
                <TextField
                    id="name"
                    label="Name"
                    //   className={classes.textField}
                    value="blah"
                    //   onChange={this.handleChange('name')}
                    margin="normal"
                />
                */}
                {/* <Divider />
                <div>
                    <TextField
                        id="name"
                        label="New Field Name"
                        //   className={classes.textField}
                        // value="New Field Name"
                        //   onChange={this.handleChange('name')}
                        margin="normal"
                    />
                    <Button
                        className={classNames(classes.add)}
                        variant="contained"
                        color="primary"
                    >
                    Add
                    </Button>
                </div>
                <Divider /> */}
                <TextField
                    label="Template"
                    multiline
                    //   className={classes.textField}
                    // value="blah"
                    onChange={this.handleTemplateChange}
                    value={previewing ? previewMessage : message}
                    margin="normal"
                    // className={classNames(previewing && classes.previewing)}
                    InputProps={{
                        classes: {
                            root: previewing && classes.previewing,
                        },
                    }}
                />
                <div className={classNames(classes.buttonContainer)}>
                    <Button
                        className={classNames(classes.copy)}
                        variant="contained"
                        color="primary"
                        onClick={this.handleCopy}
                    >
                    Copy
                    </Button>
                    <Button
                        className={classNames(classes.preview)}
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
