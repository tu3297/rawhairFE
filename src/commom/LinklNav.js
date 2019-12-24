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
        <li key={key} className="nav-item">
          <NavLink
            className="nav-link"
            activeClassName="active active-menu"
            to = {props === undefined ? element.link : props.url.concat(element.link)}>
            {element.id !== 11 ?<span className="nav-text">{element.text}</span> : <p></p>}
          </NavLink>
        </li>
      );
    });
  }
  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">{this.renderMenu(this.props.content)}</ul>
        </div>
        </nav>
    );
  }
}
export default Sidebar;
