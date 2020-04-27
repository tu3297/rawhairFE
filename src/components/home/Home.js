import React, {Component} from 'react';
import { Layout,Input, Menu, Breadcrumb, Tree,Avatar } from 'antd';
import AddColor from '../color/container/addColor.js';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import '../../css/header.css';
import LoginModal from '../modal/LoginModal';
import { Switch, Route, Link,Redirect } from "react-router-dom";
import Sidebar from '../../commom/LinklNav.js';
import AdminManager from '../admin/adminManager.js';
import WallPage from './WallPage.js';
import HomeData from '../home/container/HomdData'
import ProductInfo from './container/ProductInfo.js';
import FloatCart from '../floatcart/container/FloatCart';
import Size from '../size/container/addSize.js';
import ProductType from '../product/productType/container/addProductType';
import ProductTypeSize from '../product/productTypeSize/addProductTypeSize.js';
import ListProduct from '../product/components/ListProduct'
import PTColor from '../config/component/ProductTypeColor/container/PTColor'
import AddProduct from '../product/components/AddProduct'
import { 
  productTypeAction
} from '../product/productType/ducks/productType'
import { configConsumerProps } from 'antd/lib/config-provider';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Search } = Input;
const { TreeNode } = Tree;
const menu = [
  {
    id: '1',
    text: 'Home',
    link: 'home'
  },
  {
    id: '2',
    text: 'Shop',
    link: 'shop'
  },
  {
    id: '3',
    text: 'Contact Us',
    link: 'contact'
  },
  {
    id: '4',
    text: 'Admin',
    link: 'admin'
  }
];
const mapStateToProps = (state) => {
  console.log(state);
    const {listProductTypeHome } = state.productTypeReducer.producttype;
    let isFetching =state.productTypeReducer.producttype.isFetching;
        return {
          isFetching : isFetching,
          listProductTypeHome : listProductTypeHome,
        }  
  };
  const mapDispatchToProps = (dispatch) => ({
  fetchGetAllProductTypeHome : () => {
    dispatch(productTypeAction.fetchGetListProductTypeHome());
  },
  })
class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          listProductTypeHome : [],
          isFetching : false,
          expandedKeys: [],
          selectedKeys: [],
        }
     
  }
  componentDidMount(){
    let {fetchGetAllProductTypeHome} = this.props;
    fetchGetAllProductTypeHome();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      listProductTypeHome : nextProps.listProductTypeHome,
      isFetching : nextProps.isFetching,
    })
  }
  goHome = () => {
    this.props.history.push(`/`, {productTypeName : ""})
  }
  onSelect = (e) => {
     console.log(e.target.textContent)
     this.props.history.push(`/`,{ productTypeName : e.target.textContent});
  }
    render(){
        let treeData = []
        if(!this.state.isFetching) treeData = this.state.listProductTypeHome;
        return (
               <Layout>
                <Header className="header">
                <Avatar onClick = {() => this.goHome()} size= "large" style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" >U</Avatar>
               <div className ="float-right col-5">
                      <FloatCart></FloatCart>
                  </div> 
               </Header>
               <Layout>
                      <Sider width={200} className="site-layout-background">
                        <Sidebar
                        title={''}
                        content={menu}
                        contentHome = {treeData}
                        onSelect = {this.onSelect}
                        {...this.props}/>
                      </Sider>
                   <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                          <Breadcrumb.Item>Home</Breadcrumb.Item>
                          <Breadcrumb.Item>List</Breadcrumb.Item>
                          <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                                className="site-layout-background"
                                style={{
                                  padding: 24,
                                  margin: 0,
                                  minHeight: 280}}>
                                     <Switch>
                                          <Route path="/modalLogin" component={props => <LoginModal  {...props}/>} />
                                          <Route  exact path="/" component={HomeData} />
                                          <Route exact path="/shop" component={props => <AddColor  {...props}/>} />
                                          <Route exact path="/contact" component={props => <AddColor  {...props}/>} />
                                          <Route exact path="/admin" component={props => <AdminManager  {...props}/>} />
                                          <Route exact path= '/home/productInfo' component={ProductInfo}/>
                                          <Route exact path= '/admin/color' component={AddColor} />
                                          <Route exact path='/admin/size' component= {Size} />
                                          <Route exact path='/admin/pt' component={ProductType} />
                                          <Route exact path='/admin/prt' component={ProductTypeSize} />
                                          <Route exact path='/admin/product' component={ListProduct} />
                                          <Route exact path='/admin/config' component={PTColor} />
                                          <Route exact path= '/admin/product/createProduct' component={AddProduct} />
                                    </Switch>          
                        </Content>
                    </Layout>
                    </Layout>
            </Layout>    
        );
    }
 }
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);;