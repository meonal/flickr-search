import { SettingState, ColorTheme } from '../types/';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from '../actions/Setting';
// import { UserInfo } from 'firebase';

const initialState: SettingState = {
  theme: ColorTheme.Light,
  user: {
    displayName: null,
    email: null,
    phoneNumber: null,
    photoURL: null,
    providerId: '',
    uid: '',
  }
};

const setting = reducerWithInitialState(initialState)
  .case(actions.setTheme, (state, theme) => {
    return { ...state, theme };
  })
  .case(actions.authStateChanged, (state, user) => {
    if (user) {
      const { displayName, email, phoneNumber, photoURL, providerId, uid } = user;
      const name = displayName === null ? email : displayName;
      return {
        ...state,
        user: {
          displayName: name, email, phoneNumber, photoURL, providerId, uid
        }
      };
    } else {
      return { ...state, user: { ...initialState.user } };
    }
  });

export default setting;