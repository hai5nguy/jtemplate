import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

import { setFieldValue } from 'actions'

const styles = {
    root: {
        marginTop: '10px',
    },
}

class Field extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.value || '',
        }
    }

    valueChange = (e) => {
        this.setState({
            value: e.currentTarget.value,
        })
    }

    valueBlur = () => {
        setFieldValue(this.props.index, this.state.value)
    }

    render() {
        const { classes, name } = this.props
        const { value } = this.state
        return (
            <FormControl className={classes.root}>
                <InputLabel htmlFor="name-simple">{name}</InputLabel>
                <Input value={value} onBlur={this.valueBlur} onChange={this.valueChange} />
            </FormControl>
        )
    }
}

export default withStyles(styles)(Field)
