import React, {Component} from 'react';
import { Layout,Input, Menu, Breadcrumb, Icon } from 'antd';
import AddColor from '../color/container/addColor.js';
import 'antd/dist/antd.css';
import '../../css/header.css';
import LoginModal from '../modal/LoginModal';
import { Switch, Route, Link,Redirect } from "react-router-dom";
import Sidebar from '../../commom/LinklNav.js';
import AdminManager from '../admin/adminManager.js';
import WallPage from './WallPage.js';
import HomeData from '../home/container/HomdData'
import ProductInfo from './container/ProductInfo.js';
import FloatCart from '../floatcart/container/FloatCart';
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
               <Layout> 
                 <Header className="header">
                 <div className="container">
                <div className="row">
                <div className ="col-4">
                     <ul className="nav">
                        <li className="nav-link" ><Link to={{
                          pathname: '/modalLogin',
                          state: {modal: true}}}>Đăng Nhập</Link>
                        </li>
                    </ul>
                    <div className ="float-right col-5">
                      <FloatCart></FloatCart>
                  </div>
               </div>
               </div>
               </div>
               </Header>
               <div className="container">
                        <Sidebar
                        title={''}
                        content={menu}
                        {...this.props}/>
               </div>
               <div>
              <Switch>
                <Route path="/modalLogin" component={props => <LoginModal  {...props}/>} />
                <Route exact path="/home" component={props => <HomeData  {...props}/>} />
                <Route path="/shop" component={props => <AddColor  {...props}/>} />
                <Route path="/contact" component={props => <AddColor  {...props}/>} />
                <Route path="/admin" component={props => <AdminManager  {...props}/>} />
                <Route path= "/home/productInfo" component={props => <ProductInfo  {...props}/>} />
              </Switch>
            </div>     
            </Layout>
        );
    }
 }
export default (Home);