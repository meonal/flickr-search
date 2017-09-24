import * as React from 'react';
import './GeneralSetting.css';
import SearchActions from '../actions/Search';
import SettingActions from '../actions/Setting';
import { ColorTheme, SettingState } from '../types';
import {
  Button, Modal, ListGroup, ListGroupItem,
  ToggleButton, ToggleButtonGroup
} from 'react-bootstrap';

interface Props {
  setting: SettingState;
  actions: {
    search: SearchActions;
    setting: SettingActions;
  };
}

class GeneralSetting extends React.Component<Props, object> {
  constructor(props: any) {
    super(props);
    this.state = {
      showModal: false,
      title: '',
      message: '',
    };
    this.close = this.close.bind(this);
    this.setTheme = this.setTheme.bind(this);
  }
  close() {
    this.setState({ showModal: false });
  }
  open() {
    this.setState({ showModal: true });
  }
  resetFav(title: string, message: string) {
    const { actions } = this.props;
    actions.search.clearFav();
    this.setState({ title, message });
    this.open();
  }
  setTheme(val: any) {
    const { actions } = this.props;
    actions.setting.setTheme(val);
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
              <Button bsStyle="danger" onClick={() => this.resetFav('Setting', 'Favをリセットしました。')} >Reset</Button>
            </div>
          </ListGroupItem>
        </ListGroup>

        <Modal show={state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{state.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{state.message}</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default GeneralSetting;