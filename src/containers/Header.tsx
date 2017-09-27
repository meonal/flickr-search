import * as React from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { State, AccountState } from '../types';
import AccountActions from '../actions/Account';
import './Container.css';

interface StateProps {
  account: AccountState;
}
interface DispatchProps {
  actions: AccountActions;
}

type Props = StateProps & DispatchProps;

class HeaderContainer extends React.Component<Props, any> {
  render() {
    const { account, actions } = this.props;
    return (
      <Header account={account} actions={actions} />
    );
  }
}

export function mapStateToProps(state: State): StateProps {
  return { account: state.account };
}

export function mapDispatchToProps(dispatch: any): DispatchProps {
  return { actions: AccountActions.getInstance() };
}

export default connect<StateProps, DispatchProps, any>(mapStateToProps, mapDispatchToProps)(HeaderContainer);