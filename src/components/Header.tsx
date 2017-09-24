import * as React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
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
            <LinkContainer exact to="/"><NavItem eventKey={1}>Search</NavItem></LinkContainer>
            <LinkContainer to="/fav"><NavItem eventKey={2}>Fav</NavItem></LinkContainer>
          </Nav>
          <Nav pullRight={true}>
            <LinkContainer to="/setting"><NavItem eventKey={1}>Setting</NavItem></LinkContainer>
            <LinkContainer to="/about"><NavItem eventKey={2}>About</NavItem></LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;