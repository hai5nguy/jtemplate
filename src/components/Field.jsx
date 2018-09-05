import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
// import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'

const styles = {

}

class Field extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.value || '',
        }
    }

    handleChange = (e) => {
        this.setState({
            value: e.currentTarget.value,
        })
    }

    handleBlur = () => {
        this.props.onChange(this.state.value)
    }

    render() {
        const { name } = this.props
        const { value } = this.state
        return (
            <FormControl>
                <InputLabel htmlFor="name-simple">{name} {this.props.value}</InputLabel>
                <Input value={value} onBlur={this.handleBlur} onChange={this.handleChange} />
            </FormControl>
        )
    }
}

export default withStyles(styles)(Field)
