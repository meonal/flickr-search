//import { EnthusiasmAction } from '../actions';
import { StoreState } from '../types/index';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from '../actions/';

const initialState: StoreState = {
  enthusiasmLevel: 1,
  name: 'TypeScript',
};

// export function enthusiasm(state: StoreState = initialState, action: EnthusiasmAction): StoreState {
//   switch (action.type) {
//     case 'INCREMENT_ENTHUSIASM':
//       return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
//     case 'DECREMENT_ENTHUSIASM':
//       return { ...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1) };
//     default:
//       return state;
//   }
// }

export const hello = reducerWithInitialState(initialState)
  .case(actions.incrementEnthusiasm, (state) => {
    return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 }
  })
  .case(actions.decrementEnthusiasm, (state) => {
    return { ...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1) }
  });