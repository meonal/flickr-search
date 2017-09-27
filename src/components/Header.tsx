import * as React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { AccountState } from '../types';
import AccountActions from '../actions/Account';
import FirebaseAuth from './FirebaseAuth';
import Dialog from './Dialog';
import './Header.css';

interface Props {
  account: AccountState;
  actions: AccountActions;
}
interface State {
  showModal: boolean;
}

class Header extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { showModal: false, };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

  }
  closeDialog: () => void;
  openDialog(onClose?: () => void) {
    this.closeDialog = onClose ? onClose : this.close;
    this.setState({ showModal: true });
  }
  close = () => {
    this.setState({ showModal: false });
  }
  login() {
    this.openDialog();
  }
  logout() {
    const { actions } = this.props;
    actions.logout();
  }
  render() {
    const { account } = this.props;
    const { showModal } = this.state;
    const user = account.user;
    return (
      <div>
        <Navbar inverse={true} collapseOnSelect={true} fixedTop={true}>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Flickr Search</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer exact to="/"><NavItem>Search</NavItem></LinkContainer>
              <LinkContainer to="/fav"><NavItem>Fav</NavItem></LinkContainer>
            </Nav>
            <Nav pullRight={true}>
              {user.uid !== ''
                ? [<Navbar.Text><img src={user.photoURL!} styleName="user-icon" /></Navbar.Text>,
                <NavDropdown title={user.displayName!} id="basic-nav-dropdown">
                  <LinkContainer to="/setting"><MenuItem>Setting</MenuItem></LinkContainer>
                  <MenuItem divider />
                  <MenuItem onClick={this.logout}>Logout</MenuItem>
                </NavDropdown>]
                : <MenuItem onClick={this.login} >Login</MenuItem>
              }
              <LinkContainer to="/about"><NavItem>About</NavItem></LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Dialog isShow={showModal} title="ログイン" body={
          <div>
            Google, Twitter, GitHub 経由での認可・認証、<br />
            もしくは本サービスでのアカウント作成のどちらでもログインすることができます。
            <FirebaseAuth />
          </div>
        } onClose={this.closeDialog} />
      </div>
    );
  }
}

export default Header;