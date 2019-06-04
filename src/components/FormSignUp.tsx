import * as React from 'react';
import { Dispatch } from 'redux';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { IRootState } from '../store';

import { Modal, TextField, Button } from '@material-ui/core';
import { Text } from '../components';

import { ITechShot } from '../utils/interfaces';
import { techshotCreate, techshotEdit, selectTechshot, techshotRequestById } from '../store/techShot';
import meetupLogo from '../../assets/imgs/meetup-logo.png';


const validationForm = Yup.object().shape({
  name: Yup.string()
    .required("Campo obrigatório"),
  email: Yup.string()
    .email("Email inválido")
    .required("Email é obrigatório"),
  password: Yup.string()
    .required("Senha é obrigatório")
    .matches(/[a-zA-Z]/, 'Deve conter letras')
    .matches(/[0-9]/, 'Deve conter números'),
  confirmPassword: Yup.string()
    .required("Confirmar senha é obrigatório")
    .oneOf([Yup.ref("senha")], "As senhas não conferem")
});

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

class FormSignUp extends React.PureComponent<IMapDispatchToProps & IMapStateToProps> {

  public render() {
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          hideBackdrop={true}
          open={true}
        >
          <Body>
            <Text size={22}>CADASTRO</Text>

            <Formik
              initialValues={initialValues}
              enableReinitialize
              validationSchema={validationForm}
              onSubmit={values => {
                // const payload = {
                //   ...values,
                //   userId: "5ce030c9d323f326247f3122",
                // }

                // this.props.techshotCreate(payload);
              }}
            >
              {({ errors, touched, values: {
                name,
                email,
                password,
                confirmPassword,
              },
                handleChange, setFieldTouched, setFieldValue }) => {

                const change = (nameInput: any, e: any) => {
                  e.persist();
                  handleChange(e);
                  setFieldTouched(nameInput, true, false);
                };


                return (
                  <Form>
                    <Input
                      label="Nome completo"
                      name='name'
                      value={name}
                      helperText={touched.name ? errors.name : ""}
                      error={touched.name && Boolean(errors.name)}
                      onChange={change.bind(null, "name")}
                      width="99%"
                    />

                    <Input
                      label="Email"
                      name='email'
                      value={email}
                      helperText={touched.email ? errors.email : ""}
                      error={touched.email && Boolean(errors.email)}
                      onChange={change.bind(null, "email")}
                      width="99%"
                    />

                    <Input
                      label="Senha"
                      name='password'
                      value={password}
                      helperText={touched.password ? errors.password : ""}
                      error={touched.password && Boolean(errors.password)}
                      onChange={change.bind(null, "password")}
                      width="99%"
                    />

                    <Input
                      label="Confirmar Senha"
                      name='confirmPassword'
                      value={confirmPassword}
                      helperText={touched.confirmPassword ? errors.confirmPassword : ""}
                      error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                      onChange={change.bind(null, "confirmPassword")}
                      width="99%"
                    />

                    <Btn type="submit">Salvar</Btn>
                    <Btn oauth>Continuar com o <Image src={meetupLogo}/></Btn>
                  </Form>
                )
              }}
            </Formik>

          </Body>
        </Modal>
      </div >
    );
  }
}

// MAP TO PROPS
interface IMapStateToProps {
  techshot: ITechShot;
};

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  techshot: selectTechshot(state),
});

interface IMapDispatchToProps {
  techshotCreate: (payload: ITechShot) => void;
  techshotEdit: (payload: ITechShot, techshotId: string) => void;
  techshotRequestById: (techshotId: string) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => ({
  techshotCreate: (payload: ITechShot) => dispatch(techshotCreate.started(payload)),
  techshotEdit: (payload: ITechShot, techshotId: string) => dispatch(techshotEdit.started({ payload, techshotId })),
  techshotRequestById: (techshotId: string) => dispatch(techshotRequestById.started({ techshotId })),
})


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

const Input: any = styled(TextField)<{ width: string }>`
&&{
  margin: 5px;
  width: ${props => props.width};
}
` as typeof TextField;

const Btn: any = styled(Button)<{ oauth?: boolean }>`
&&{
  margin-top: 20px;
  width: 100%;
  background-color: ${props => props.oauth ? '#ED1C40' : props.theme.colors.primary};
  color: ${props => props.theme.colors.white}
}
` as typeof Button;

const Image = styled.img`
  width: 80px;
  height: 30px;
`;

export default connect(mapStateToProps, mapDispatchToProps)(FormSignUp);
