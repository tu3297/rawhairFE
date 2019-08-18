import { Menu, Icon } from 'antd';
import React, {Component} from 'react';
import { Switch, Route, Link } from "react-router-dom";
import '../../css/mainnav.css';
import AddColor from '../color/addColor.js';
import Sidebar from '../../commom/LinklNav.js';
import AdminManager from '../admin/adminManager.js';
const { SubMenu } = Menu;
const menu = [
  {
    id: 0,
    text: 'Home',
    link: '/home'
  },
  {
    id: 1,
    text: 'Shop',
    link: '/shop'
  },
  {
    id: 2,
    text: 'Contact Us',
    link: '/contact'
  },
  {
    id: 3,
    text: 'Admin',
    link: '/admin'
  }
];
class MainNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'mail',
            adminMode :false
        }
    }
  render() {
    return (
      <div class = "main-nav-menu">
      <Sidebar
          title={''}
          content={menu}
          {...this.props}
        />
       <div>
          <Switch>
            <Route path="/home" component={props => <AddColor  {...props}/>} />
            <Route path="/shop" component={props => <AddColor  {...props}/>} />
            <Route path="/contact" component={props => <AddColor  {...props}/>} />
            <Route path="/admin" component={props => <AdminManager  {...props}/>} />
          </Switch>
      </div>
      </div>
    );
  }
}
export default MainNav;