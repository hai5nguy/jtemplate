import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { AppMenu } from 'components'

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

function TopBar(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <AppMenu />
                    {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="title" color="inherit" className={classes.flex}>
                        jTemplate
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withStyles(styles)(TopBar);
