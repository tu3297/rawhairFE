import { Drawer, Button } from 'antd';
import React, {Component} from 'react';
class CartDrawer extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            visible: props.location.state.cart
        }
    }
  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </div>
    );
  }
}

export default CartDrawer;