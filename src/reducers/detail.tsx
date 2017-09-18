import { DetailState, DetailType } from '../types/';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from '../actions/Search';

const initialState: DetailState = {
  type: DetailType.Search,
  id: '',
};

const detail = reducerWithInitialState(initialState)
  .case(actions.setDetail, (state, { id, type }) => {
    return type === DetailType.None ? { ...state, id } : { ...state, id, type };
  });

export default detail;