import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();
// 遷移元アドレスを保存
export const locationChanged = actionCreator<string>('LOCATION_CHANGED');
