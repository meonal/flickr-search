import * as React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface Props {
  title: string;
  message?: string;
  body?: JSX.Element;
  isShow: boolean;
  onClose: () => void;
}

class Dialog extends React.Component<Props, object> {
  render() {
    const { title, message, body, isShow, onClose } = this.props;
    return (
      <Modal show={isShow} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message}
          {body}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Dialog;