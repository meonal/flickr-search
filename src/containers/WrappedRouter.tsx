import * as React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { connect } from 'react-redux';
import { State } from '../types';
import './WrappedRouter.css';

export class WrappedRouter extends React.Component<any, any> {
  render() {
    const { theme } = this.props;
    const style = 'wrapper theme-' + theme;
    return (
      <div styleName={style}>
        <ConnectedRouter {...this.props} />
      </div>
    );
  }
}
export function mapStateToProps(state: State): any {
  return { theme: state.setting.theme };
}

export default connect<any, any, any>(mapStateToProps)(WrappedRouter);