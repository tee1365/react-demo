import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {withStyles} from "@material-ui/core/styles";

const styles = {
  container: {
    float: "right"
  },
  menu: {
    marginLeft: "-20px",
    marginTop: "50px"
  }
};

class TodoConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      target: null
    };
  }

  handleClick = e => {
    this.setState({target: e.currentTarget});
  };

  handleClose = e => {
    this.setState({target: null});
  };

  render() {
    return (
      <div className={this.props.classes.container}>
        <Button variant="text" size="small" onClick={this.handleClick}>
          <MoreVertIcon />
        </Button>
        <Menu
          className={this.props.classes.menu}
          open={Boolean(this.state.target)}
          anchorEl={this.state.target}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.props.clearList.bind(this)}>
            清空列表
          </MenuItem>
          <MenuItem onClick={this.props.toggleDeletedList.bind(this)}>
            恢复删除项
          </MenuItem>
          <MenuItem onClick={this.props.logOut.bind(this)}>登出</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(TodoConfig);
