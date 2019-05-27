import * as React from 'react';
import styled from 'styled-components';
import { Modal, Button } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import { Text } from '../components';


interface IProps {
  text: string;
  open: boolean;
  handleClose: () => void;
  action: () => void;
}

class ModalConfirmation extends React.PureComponent<IProps> {
  
   public render() {
    const { text, open, handleClose, action } = this.props;
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <Body>
            <AlertIcon />
            <Text size={15}>{text}</Text>
            <BtnContainer>
              <Btn cancel onClick={handleClose}>Cancelar</Btn>
              <Btn onClick={action}>Deletar</Btn>
            </BtnContainer>
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
    width: 315px;
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

const AlertIcon: any = styled(WarningIcon)`
&&{
  margin: 5px;
  width: 70px;
  height: 70px;
  color: ${props => props.theme.colors.orange};
}
` as typeof WarningIcon;

const Btn: any = styled(Button)<{cancel: boolean}>`
&&{
  margin-top: 20px;
  width: 48%;
  background-color: ${props => props.cancel ? props.theme.colors.gray30 : props.theme.colors.primary};
  color: ${props => props.theme.colors.white}
}
` as typeof Button;

const BtnContainer = styled.div`
&&{
  display: flex;
  justify-content: space-between;
  width: 100%;
}
`;


export default ModalConfirmation;
