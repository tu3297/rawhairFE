import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  renderMenu(data) {
    const props = this.props.match;
    return data.map((element, key) => {
      return (
        <li key={key} className="nav-item menu-item">
          <NavLink
            className="nav-link"
            activeClassName="active active-menu"
            to = {props.url.concat(element.link)}>
            <span className="nav-text">{element.text}</span>
          </NavLink>
        </li>
      );
    });
  }
  render() {
    return (
      <div className="sub-menu">
        <div className="sub-menu-container">
          <ul className="nav">{this.renderMenu(this.props.content)}</ul>
        </div>
      </div>
    );
  }
}
export default Sidebar;
