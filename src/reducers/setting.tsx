import { SettingState, ColorTheme } from '../types/';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from '../actions/Setting';

const initialState: SettingState = {
  theme: ColorTheme.Light,
};

const setting = reducerWithInitialState(initialState)
  .case(actions.setTheme, (state, theme) => {
    return { ...state, theme };
  })
  .case(actions.syncSettig, (state, setting) => {
    return setting ? setting : state;
  });

export default setting;