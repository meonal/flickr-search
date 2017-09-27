import * as React from 'react';
import GeneralSetting from '../components/GeneralSetting';
import SearchActions from '../actions/Search';
import SettingActions from '../actions/Setting';
import AccountActions from '../actions/Account';
import { connect } from 'react-redux';
import { State, SettingState } from '../types';
import { PageHeader } from 'react-bootstrap';
import './Container.css';

interface StateProps {
  setting: SettingState;
}
interface DispatchProps {
  actions: {
    search: SearchActions;
    setting: SettingActions;
    account: AccountActions;
  };
}

type SettingProps = StateProps & DispatchProps;

class Setting extends React.Component<SettingProps, any> {
  render() {
    const { setting, actions } = this.props;
    return (
      <div styleName="page-body">
        <PageHeader>Setting</PageHeader>
        <GeneralSetting setting={setting} actions={actions} />
      </div>
    );
  }
}

export function mapStateToProps(state: State): StateProps {
  return { setting: state.setting };
}

export function mapDispatchToProps(dispatch: any): DispatchProps {
  return {
    actions: {
      search: SearchActions.getInstance(),
      setting: SettingActions.getInstance(),
      account: AccountActions.getInstance(),
    }
  };
}

export default connect<StateProps, DispatchProps, any>(mapStateToProps, mapDispatchToProps)(Setting);