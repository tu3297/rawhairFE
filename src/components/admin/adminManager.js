import React, {Component} from 'react';
import { Switch, Route, Link } from "react-router-dom";
import Sidebar from '../../commom/LinklNav.js';
import AddColor from '../color/container/addColor.js';
import Size from '../size/container/addSize.js';
import ProductType from '../product/productType/container/addProductType';
import ProductTypeSize from '../product/productTypeSize/addProductTypeSize.js';
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
    }
  ];
class AdminManager extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      const match = this.props.match;
        return (
            <div className="container">
          <div class = "main-nav-menu">
          <Sidebar
              title={''}
              content={subMenu}
              {...this.props}
            />
            </div>
           <div>
              <Switch>
                <Route path={`${match.path}/color`} component={props => <AddColor  {...props}/>} />
                <Route path={`${match.path}/size`} component={props => <Size  {...props}/>} />
                <Route path={`${match.path}/pt`} component={props => <ProductType  {...props}/>} />
                <Route path={`${match.path}/prt`} component={props => <ProductTypeSize {...props}/>} />
              </Switch>
          </div>
          </div>
        );
      }
}
export default AdminManager;