import * as React from 'react';
import './GeneralSetting.css';
import SearchActions from '../actions/Search';
import SettingActions from '../actions/Setting';
import AccountActions from '../actions/Account';
import { ColorTheme, SettingState } from '../types';
import Dialog from './Dialog';
import {
  Button, ListGroup, ListGroupItem,
  ToggleButton, ToggleButtonGroup
} from 'react-bootstrap';

interface Props {
  setting: SettingState;
  actions: {
    search: SearchActions;
    setting: SettingActions;
    account: AccountActions;
  };
}

class GeneralSetting extends React.Component<Props, object> {
  constructor(props: any) {
    super(props);
    this.state = {
      showModal: false,
      message: '',
    };
    this.close = this.close.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.setTheme = this.setTheme.bind(this);
    this.resetFav = this.resetFav.bind(this);
  }
  closeDialog: () => void;

  openDialog(onClose?: () => void) {
    this.closeDialog = onClose ? onClose : this.close;
    this.setState({ showModal: true });
  }
  close = () => {
    this.setState({ showModal: false });
  }
  resetFav() {
    const { actions } = this.props;
    actions.search.clearFav();
    this.setState({ message: 'Favをリセットしました。' });
    this.openDialog();
  }
  setTheme(val: any) {
    const { actions } = this.props;
    actions.setting.setTheme(val);
  }
  async deleteUser() {
    const { actions } = this.props;
    const message = await actions.account.deleteUser();
    this.setState({ message });
    this.openDialog(() => {
      this.close();
      const { actions } = this.props;
      actions.account.routing.gotoSearch();
    });
  }

  render() {
    const { setting } = this.props;
    const state = this.state as any;
    return (
      <div styleName="general-setting">
        <ListGroup>
          <ListGroupItem bsStyle="info" header="テーマの切り替え">
            <div styleName="item">
              <span>アプリ全体のカラーテーマを切り替えます。</span>
              <ToggleButtonGroup type="radio" name="theme"
                defaultValue={setting.theme} onChange={this.setTheme}>
                <ToggleButton value={ColorTheme.Light}>{ColorTheme.Light}</ToggleButton>
                <ToggleButton value={ColorTheme.Dark}>{ColorTheme.Dark}</ToggleButton>
              </ToggleButtonGroup>
            </div>
          </ListGroupItem>
          <ListGroupItem bsStyle="danger" header="Favのリセット">
            <div styleName="item">
              <span>すべてのFavを削除します。この操作は戻せません。</span>
              <Button bsStyle="danger" onClick={this.resetFav} >Reset</Button>
            </div>
          </ListGroupItem>
          <ListGroupItem bsStyle="danger" header="アカウントの削除">
            <div styleName="item">
              <div>
                アカウントを削除します。アカウントに紐づくユーザー情報、<br />
                Fav、Settingも削除します。この操作は戻せません。
              </div>
              <Button bsStyle="danger" onClick={this.deleteUser} >Delete</Button>
            </div>
          </ListGroupItem>
        </ListGroup>

        <Dialog isShow={state.showModal} title="Setting" message={state.message} onClose={this.closeDialog} />
      </div>
    );
  }
}

export default GeneralSetting;