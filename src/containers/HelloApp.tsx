import * as React from 'react';
import Hello from '../components/Hello';
import * as actions from '../actions/';
import { StoreState } from '../types/index';
import { connect, Dispatch } from 'react-redux';
import { Action } from 'redux';

class HelloApp extends React.Component<any, any> {
  render() {
    const { hello, ...action} = this.props;
    return (
      <Hello {...hello} {...action} />
    );
  }
}

export function mapStateToProps(state: StoreState) {
  return state;
}

export function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    onIncrement: () => dispatch(actions.incrementEnthusiasm()),
    onDecrement: () => dispatch(actions.decrementEnthusiasm()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HelloApp);