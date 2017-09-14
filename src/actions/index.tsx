import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export const incrementEnthusiasm = actionCreator('INCREMENT_ENTHUSIASM');
export const decrementEnthusiasm = actionCreator('DECREMENT_ENTHUSIASM');