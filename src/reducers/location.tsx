import { LocationState } from '../types/';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from '../actions/Location';

const initialState: LocationState = {
  prevPath: '',
  currentPath: '',
};

const location = reducerWithInitialState(initialState)
  .case(actions.locationChanged, (state, currentPath) => {
    return { ...state, currentPath, prevPath: state.currentPath };
  });

export default location;