import * as React from 'react';
import './GeneralSetting.css';
import SearchActions from '../actions/Search';
import { Button, Modal, ListGroup, ListGroupItem, PageHeader } from 'react-bootstrap';

interface Props {
  setting: any;
  actions: SearchActions;
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
  }
  close() {
    this.setState({ showModal: false });
  }
  open() {
    this.setState({ showModal: true });
  }
  resetFav(title: string, message: string) {
    const { actions } = this.props;
    actions.clearFav();
    this.setState({ title, message });
    this.open();
  }
  render() {
    const state = this.state as any;
    return (
      <div styleName="general-setting">
        <PageHeader>Setting</PageHeader>
        <ListGroup>
          <ListGroupItem bsStyle="danger" header="Favのリセット">
            すべてのFavを削除します。この操作は戻せません。
            <Button bsStyle="danger" onClick={() => this.resetFav('Setting', 'Favをリセットしました。')} >Reset</Button>
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