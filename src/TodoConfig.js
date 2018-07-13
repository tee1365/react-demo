import React, {Component} from "react";
import DeletedList from "./DeletedList.js";
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
      target: null,
      deletedListOpen: false
    };
  }

  handleClick = e => {
    this.setState({target: e.currentTarget});
  };

  handleClose = e => {
    this.setState({target: null});
  };

  toggleDeletedList() {
    this.setState({
      deletedListOpen: this.state.deletedListOpen === false ? true : false
    });
  }

  closeMenu = () => {
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
          <MenuItem
            onClick={() => {
              this.props.clearList();
              this.closeMenu();
            }}
          >
            清空列表
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.toggleDeletedList();
              this.closeMenu();
            }}
          >
            恢复删除项
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.props.logOut();
              this.closeMenu();
            }}
          >
            登出
          </MenuItem>
        </Menu>
        {this.state.deletedListOpen ? (
          <DeletedList
            deletedListOpen={this.state.deletedListOpen}
            user={this.props.user}
            toggleDeletedList={this.toggleDeletedList.bind(this)}
            todoList={this.props.todoList}
            undoDelete={this.props.undoDelete.bind(this)}
          />
        ) : null}
      </div>
    );
  }
}

export default withStyles(styles)(TodoConfig);
