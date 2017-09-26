import * as React from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { State, SettingState } from '../types';
import SettingActions from '../actions/Setting';
import './Container.css';

interface StateProps {
  setting: SettingState;
}
interface DispatchProps {
  actions: SettingActions;
}

type Props = StateProps & DispatchProps;

class HeaderContainer extends React.Component<Props, any> {
  render() {
    const { setting, actions } = this.props;
    return (
      <Header setting={setting} actions={actions} />
    );
  }
}

export function mapStateToProps(state: State): StateProps {
  return { setting: state.setting };
}

export function mapDispatchToProps(dispatch: any): DispatchProps {
  return { actions: SettingActions.getInstance(dispatch) };
}

export default connect<StateProps, DispatchProps, any>(mapStateToProps, mapDispatchToProps)(HeaderContainer);