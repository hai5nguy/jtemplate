import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
// import { mailFolderListItems, otherMailFolderListItems } from './tileData'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/Inbox'
import DraftsIcon from '@material-ui/icons/Drafts'


const styles = {
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
};

class AppDrawer extends React.Component {
    state = {
        top: false,
        left: false,
        bottom: false,
        right: false,
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    render() {
        const { classes } = this.props;

        const sideList = (
            <div className={classes.list}>
                {/* <List>{mailFolderListItems}</List> */}
                <Divider />
                {/* <List>{otherMailFolderListItems}</List> */}
            </div>
        );

        const fullList = (
            <div className={classes.fullList}>
                {/* <List>{mailFolderListItems}</List> */}
                <Divider />
                {/* <List>{otherMailFolderListItems}</List> */}
            </div>
        );

        return (
            <div>
                <Button onClick={this.toggleDrawer('left', true)}>Open Left</Button>
                <Button onClick={this.toggleDrawer('right', true)}>Open Right</Button>
                <Button onClick={this.toggleDrawer('top', true)}>Open Top</Button>
                <Button onClick={this.toggleDrawer('bottom', true)}>Open Bottom</Button>
                <SwipeableDrawer
                    open={this.state.left}
                    onClose={this.toggleDrawer('left', false)}
                    onOpen={this.toggleDrawer('left', true)}
                >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('left', false)}
                        onKeyDown={this.toggleDrawer('left', false)}
                    >
                        <List component="nav">
                            <ListItem button>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary="Inbox" />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <DraftsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Drafts" />
                            </ListItem>
                        </List>
                        {sideList}
                    </div>
                </SwipeableDrawer>
                <SwipeableDrawer
                    anchor="top"
                    open={this.state.top}
                    onClose={this.toggleDrawer('top', false)}
                    onOpen={this.toggleDrawer('top', true)}
                >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('top', false)}
                        onKeyDown={this.toggleDrawer('top', false)}
                    >
                        {fullList}
                    </div>
                </SwipeableDrawer>
                <SwipeableDrawer
                    anchor="bottom"
                    open={this.state.bottom}
                    onClose={this.toggleDrawer('bottom', false)}
                    onOpen={this.toggleDrawer('bottom', true)}
                >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('bottom', false)}
                        onKeyDown={this.toggleDrawer('bottom', false)}
                    >
                        {fullList}
                    </div>
                </SwipeableDrawer>
                <SwipeableDrawer
                    anchor="right"
                    open={this.state.right}
                    onClose={this.toggleDrawer('right', false)}
                    onOpen={this.toggleDrawer('right', true)}
                >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('right', false)}
                        onKeyDown={this.toggleDrawer('right', false)}
                    >
                        {sideList}
                    </div>
                </SwipeableDrawer>
            </div>
        );
    }
}

export default withStyles(styles)(AppDrawer);
