import React, {Component} from 'react';
import { Layout,Input, Menu, Breadcrumb, Icon } from 'antd';
import AddColor from '../color/container/addColor.js';
import 'antd/dist/antd.css';
import '../../css/header.css';
import LoginModal from '../modal/LoginModal';
import { Switch, Route, Link,Redirect } from "react-router-dom";
import CartDrawer from '../modal/CartDrawer';
import Sidebar from '../../commom/LinklNav.js';
import AdminManager from '../admin/adminManager.js';
import WallPage from './WallPage.js';
import HomeData from '../home/container/HomdData'
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Search } = Input;
const menu = [
  {
    id: 0,
    text: 'Home',
    link: 'home'
  },
  {
    id: 1,
    text: 'Shop',
    link: 'shop'
  },
  {
    id: 2,
    text: 'Contact Us',
    link: 'contact'
  },
  {
    id: 3,
    text: 'Admin',
    link: 'admin'
  }
];
class Home extends React.Component {
    constructor(props){
        super(props);
     
  }
    render(){
      
        return (
               <div>
               <div className ="container">
               <div className="container">
                <div className="row">
                <div className ="col-8">
                  <div className ="row">
                    <div className ="col-4">
                       <img src ="https://static.wixstatic.com/media/2ed9ca_5a0ea56469014c42996dbe06c6db5774~mv2.png/v1/fill/w_235,h_235,al_c,q_80,usm_0.66_1.00_0.01/2ed9ca_5a0ea56469014c42996dbe06c6db5774~mv2.webp"></img> 
                    </div>         
                </div>
                </div>
                <div className ="col-4">
                     <ul className="nav">
                        <li className="nav-link" ><Link to={{
                          pathname: '/modalLogin',
                          state: {modal: true}}}>Đăng Nhập</Link>
                        </li>
                        <li className="nav-link"><Link to={{
                          pathname: '/cart',
                          state: {cart: true}}}>Giỏ Hàng</Link>
                        </li>
                    </ul>  
               </div>
               </div>
               </div>
               <div className="container">
                        <Sidebar
                        title={''}
                        content={menu}
                        {...this.props}/>
               </div>
               <div>
              <Switch>
                <Route path="/modalLogin" component={props => <LoginModal  {...props}/>} />
                <Route path="/cart" component={props => <CartDrawer  {...props}/>} />
                 <Route path="/home" component={props => <HomeData  {...props}/>} />
                <Route path="/shop" component={props => <AddColor  {...props}/>} />
                <Route path="/contact" component={props => <AddColor  {...props}/>} />
                <Route path="/admin" component={props => <AdminManager  {...props}/>} />
              </Switch>
            </div>     
            </div>
            </div>
        );
    }
 }
export default (Home);