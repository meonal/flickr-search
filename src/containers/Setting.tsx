import * as React from 'react';
import Header from '../components/Header';
import GeneralSetting from '../components/GeneralSetting';
import SearchActions from '../actions/Search';
import { connect } from 'react-redux';
import { State } from '../types';
import './Container.css';

interface StateProps {
  setting: any;
}
interface DispatchProps {
  actions: SearchActions;
}

type SettingProps = StateProps & DispatchProps;

class Setting extends React.Component<SettingProps, any> {
  render() {
    const { setting, actions } = this.props;
    return (
      <div>
        <Header />
        <div styleName="page-body">
          <GeneralSetting setting={setting} actions={actions} />
        </div>
      </div>
    );
  }
}

export function mapStateToProps(state: State): StateProps {
  return { setting: '' };
}

export function mapDispatchToProps(dispatch: any): DispatchProps {
  return { actions: SearchActions.getInstance(dispatch) };
}

export default connect<StateProps, DispatchProps, any>(mapStateToProps, mapDispatchToProps)(Setting);