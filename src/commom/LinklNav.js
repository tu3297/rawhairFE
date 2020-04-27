import React, { Component } from 'react';
import {Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { Tree } from 'antd';
const { TreeNode } = Tree;
const { SubMenu } = Menu;
const subMenu = [
  {
    id: '40',
    text: 'Product',
    link: 'admin/product'
  },
  {
    id: '41',
    text: 'Size',
    link: 'admin/size'
  },
  {
    id: '42',
    text: 'Color',
    link: 'admin/color'
  },
  {
    id: '43',
    text: 'Deliver Policy',
    link: 'admin/deliver-policy'
  },
  {
    id: '44',
    text: 'User',
    link: 'admin/user'
  },
  {
    id: '45',
    text: 'Role',
    link: 'admin/role'
  },
  {
    id: '46',
    text: 'Permission',
    link: 'admin/permission'
  },
  {
    id: '47',
    text: 'Product-Size-Type',
    link: 'admin/prt'
  },
  {
    id: '48',
    text: 'Product Type',
    link: 'admin/pt'
  },
  {
    id: '49',
    text: 'Menu',
    link: 'admin/menu'
  },
  {
    id: '50',
    text: 'Config',
    link: 'admin/config'
  }
];
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {

        checkedKeys:[],
        selectedKeys:[]
    }
    };
  renderSubmenu = (data) => {
    const props = this.props.match;
    return  data.map((element, key) => {
      return (
      <Menu.Item key = {element.id}>
            <NavLink
              to = {props === undefined ? element.link : props.url.concat(element.link)}> <span>{element.text}</span>
            </NavLink>
      </Menu.Item>
      )
    })
  }
  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
    });
  };
  renderTreeNodes = (data) =>
          data.map(item => {
            if (item.children) {
              return (
                <TreeNode title={item.title}>
                  {this.renderTreeNodes(item.children)}/
                </TreeNode>
              );
            }
            return <TreeNode {...item} />;
   });
  renderMenu(data) {
    const props = this.props.match;
    return data.map((element, key) => {
      if(element.text === "Admin"){
        return (
        <SubMenu key = {element.id} title = {<span>{element.text}</span>} >
              {this.renderSubmenu(subMenu)}
          </SubMenu>
        )
      } else if (element.text === "Home") {
         let treeData = this.props.contentHome;
             return (
                  <SubMenu key = {element.id} title = {<span>{element.text}</span>} >
                          <Tree onClick = {this.props.onSelect}>
                              {this.renderTreeNodes(treeData)}
                          </Tree>
                  </SubMenu>)
      } else {
      return (
        <Menu.Item key = {element.id}>
          <NavLink
            to = {props === undefined ? element.link : props.url.concat(element.link)}>
            {element.id !== 11 ?<span className="nav-text">{element.text}</span> : <p></p>}
          </NavLink>
        </Menu.Item>
      );
    }
  });
  }
  render() {
    return (
      <Menu defaultSelectedKeys={['1']} mode="inline" style={{ height: '100%' }}>
          {this.renderMenu(this.props.content)}
      </Menu>
    )
}
}
export default Sidebar;
