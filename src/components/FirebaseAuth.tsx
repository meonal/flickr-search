import * as React from 'react';
import { authUI, uiConfig } from '../firebase/authUI';
// import 'firebaseui/dist/firebaseui.css';

const PLACEHOLDER_ID = 'firebase-auth';

interface Props {
  placeholderId?: string;
}

export default class FirebaseAuth extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    const { placeholderId } = props;
    this.placeholderId = placeholderId || PLACEHOLDER_ID;
  }
  placeholderId: string;

  componentDidMount() {
    authUI.reset();
    authUI.start('#' + this.placeholderId, uiConfig);
  }
  componentWillUnmount() {
    authUI.reset();
  }
  render() {
    return (
      <div id={this.placeholderId} />
    );
  }
}