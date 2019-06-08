import * as React from 'react';
import styled from 'styled-components';
import { Modal } from '@material-ui/core';
import { FormSignUp } from '../components';

interface IProps {
  open: boolean;
  handleClose: () => void;
}

class ModalCreateAdmUser extends React.PureComponent<IProps> {

  public render() {
    const { open, handleClose } = this.props;
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <Body>
            <FormSignUp isAdm handleClose={handleClose}/>
          </Body>
        </Modal>
      </div >
    );
  }
}

// STYLE
const Body = styled.div`
	  background-color: ${props => props.theme.colors.white};
    position: absolute;
    width: 400px;
    box-shadow: 5px 10px 10px #888888;
    border-radius: 5px;
    padding: 20px;
    outline: 'none';
    top: 46%;
    left: 50%;
    transform: translate(-46%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export default ModalCreateAdmUser;
