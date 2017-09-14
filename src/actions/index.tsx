//import * as constants from '../constants';

// export const INCREMENT_ENTHUSIASM = 'INCREMENT_ENTHUSIASM';
// export type INCREMENT_ENTHUSIASM = typeof INCREMENT_ENTHUSIASM;

// export const DECREMENT_ENTHUSIASM = 'DECREMENT_ENTHUSIASM';
// export type DECREMENT_ENTHUSIASM = typeof DECREMENT_ENTHUSIASM;

// export type EnthusiasmAction = IncrementEnthusiasm | DecrementEnthusiasm;

// export interface IncrementEnthusiasm {
//   type: INCREMENT_ENTHUSIASM;
// }
// export function incrementEnthusiasm(): IncrementEnthusiasm {
//   return {
//     type: 'INCREMENT_ENTHUSIASM'
//   };
// }

// export interface DecrementEnthusiasm {
//   type: 'DECREMENT_ENTHUSIASM';
// }
// export function decrementEnthusiasm(): DecrementEnthusiasm {
//   return {
//     type: 'DECREMENT_ENTHUSIASM'
//   };
// }

import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export const incrementEnthusiasm = actionCreator('INCREMENT_ENTHUSIASM');
export const decrementEnthusiasm = actionCreator('DECREMENT_ENTHUSIASM');

