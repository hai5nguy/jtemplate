import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

class AppMenu extends React.Component {
  state = {
      anchorEl: null,
  };

  handleClick = (event) => {
      this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
      this.setState({ anchorEl: null });
  };

  render() {
      const { anchorEl } = this.state;

      return (
          <div>

              <IconButton color="inherit" onClick={this.handleClick}>
                  <MenuIcon />
              </IconButton>

              <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
              >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                  <MenuItem onClick={this.handleClose}>Logout</MenuItem>
              </Menu>
          </div>
      );
  }
}

export default AppMenu;
