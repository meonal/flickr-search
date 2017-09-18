import * as React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Header extends React.Component<any, object> {
  render() {
    return (
      <Navbar inverse={true} collapseOnSelect={true} fixedTop={true}>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Flickr Search</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} ><Link to="/">Top</Link></NavItem>
            <NavItem eventKey={2} ><Link to="/fav">Fav</Link></NavItem>
          </Nav>
          <Nav pullRight={true}>
            <NavItem eventKey={1} ><Link to="/about">About</Link></NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;