import firebase from '../';
import { SettingState } from '../../types';

export const db = firebase.database();

export async function writeSetting(userId: string, setting: SettingState) {
  const user = db.ref('users/' + userId);
  return await user.set({ setting });
}

export async function readSetting(userId: string, action: (val: SettingState) => void) {
  const setting = db.ref('users/' + userId + '/setting');
  return setting.on('value', (snapshot) => {
    if (snapshot !== null) {
      action(snapshot.val());
    }
  });
}
