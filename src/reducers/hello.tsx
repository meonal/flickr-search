import { StoreState } from '../types/index';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from '../actions/';

const initialState: StoreState = {
  enthusiasmLevel: 1,
  name: 'TypeScript',
};

export const hello = reducerWithInitialState(initialState)
  .case(actions.incrementEnthusiasm, (state) => {
    return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
  })
  .case(actions.decrementEnthusiasm, (state) => {
    return { ...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1) };
  });