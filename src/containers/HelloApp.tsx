//import * as React from 'react';
import Hello from '../components/Hello';
import * as actions from '../actions/';
import { StoreState } from '../types/index';
import { connect, Dispatch } from 'react-redux';
import { Action } from 'redux';

// class HelloApp extends React.Component<any, any> {
//   render() {
//     return (
//       <Hello {...this.props} />
//     );    
//   }
// }

export function mapStateToProps(state: StoreState) {
  return {
    name: state.name,
    enthusiasmLevel: state.enthusiasmLevel,
  };
}

export function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    onIncrement: () => dispatch(actions.incrementEnthusiasm()),
    onDecrement: () => dispatch(actions.decrementEnthusiasm()),
  };
}

export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
  return Object.assign({}, ownProps, stateProps, dispatchProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Hello);