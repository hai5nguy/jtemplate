import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import TOCIcon from '@material-ui/icons/Toc'
import HelpIcon from '@material-ui/icons/Help'
import { AboutModal } from 'components'

import { setActiveView } from 'actions'

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flexGrow: 1,
    },
    headerText: {
        flexGrow: 1,
        userSelect: 'none',
        fontSize: '30px',
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class TopBar extends React.Component {
    state = {
        left: false,
        aboutOpen: false,
    }

    toggleDrawer = open => () => {
        this.setState({
            left: open,
        })
    }

    showAbout = aboutOpen => () => {
        this.setState({ aboutOpen })
    }

    render() {
        const { classes } = this.props
        const { aboutOpen } = this.state
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="Menu"
                            onClick={this.toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>

                        <SwipeableDrawer
                            open={this.state.left}
                            onClose={this.toggleDrawer(false)}
                            onOpen={this.toggleDrawer(true)}
                        >
                            <div
                                tabIndex={0}
                                role="button"
                                onClick={this.toggleDrawer(false)}
                                onKeyDown={this.toggleDrawer(false)}
                            >
                                <List component="nav">
                                    <ListItem button onClick={setActiveView('MANAGE_FIELDS')}>
                                        <ListItemIcon>
                                            <TOCIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Manage Fields" />
                                    </ListItem>
                                    <ListItem button onClick={this.showAbout(true)}>
                                        <ListItemIcon>
                                            <HelpIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="About" />
                                    </ListItem>
                                </List>
                            </div>
                        </SwipeableDrawer>

                        <Typography variant="title" color="inherit" className={classes.headerText}>
                            jTemplate hi marcus
                        </Typography>

                        <AboutModal open={aboutOpen} onClose={this.showAbout(false)} />

                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(TopBar);
