import React, {Component} from 'react';
import { Switch, Route, Link } from "react-router-dom";
import Sidebar from '../../commom/LinklNav.js';
import AddColor from '../color/container/addColor.js';
import Size from '../size/container/addSize.js';
import ProductType from '../product/productType/container/addProductType';
import ProductTypeSize from '../product/productTypeSize/addProductTypeSize.js';
import ListProduct from '../product/components/ListProduct'
import PTColor from '../config/component/ProductTypeColor/container/PTColor'
import AddProduct from '../product/components/AddProduct'
import ProductInfo from '../home/container/ProductInfo.js';
import { Layout } from 'antd';
const subMenu = [
    {
      id: 0,
      text: 'Product',
      link: '/product'
    },
    {
      id: 1,
      text: 'Size',
      link: '/size'
    },
    {
      id: 2,
      text: 'Color',
      link: '/color'
    },
    {
      id: 3,
      text: 'Deliver Policy',
      link: '/deliver-policy'
    },
    {
      id: 4,
      text: 'User',
      link: '/user'
    },
    {
      id: 5,
      text: 'Role',
      link: '/role'
    },
    {
      id: 6,
      text: 'Permission',
      link: '/permission'
    },
    {
      id: 7,
      text: 'Product-Size-Type',
      link: '/prt'
    },
    {
      id: 8,
      text: 'Product Type',
      link: '/pt'
    },
    {
      id: 9,
      text: 'Menu',
      link: '/menu'
    },
    {
      id: 10,
      text: 'Config',
      link: '/config'
    }, {
      id: 11,
      text: 'createProduct',
      link: '/createProduct'
    }
  ];
class AdminManager extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      const match = this.props.match;
      console.log(match.path)
        return (
        <div>
              <Switch>
                <Route exact path={`${match.path}/color`} component={props => <AddColor  {...props}/>} />
                <Route exact path={`${match.path}/size`} component={props => <Size  {...props}/>} />
                <Route exact path={`${match.path}/pt`} component={props => <ProductType  {...props}/>} />
                <Route exact path={`${match.path}/prt`} component={props => <ProductTypeSize {...props}/>} />
                <Route exact path={`${match.path}/product`} component={props => <ListProduct {...props}/>} />
                <Route exact path={`${match.path}/config`} component={props => <PTColor {...props}/>} />
                <Route exact path={`${match.path}/product/createProduct`} component={props => <AddProduct  {...props}/>} />
              </Switch>
          </div>
        );
      }
}
export default AdminManager;