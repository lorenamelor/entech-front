import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { IRootState } from '../store';
import { userSignin, userActionDone, selectuserAction, selectIsCreateUser } from '../store/user';
import theme from '../utils/theme';

const validationForm = Yup.object().shape({
  email: Yup.string()
    .email("Email inválido")
    .required("Email é obrigatório"),
  password: Yup.string()
    .required("Senha é obrigatório")
});

const initialValues = {
  email: '',
  password: '',
}

class FormLogin extends React.PureComponent<IMapDispatchToProps & IMapStateToProps> {
  public render() {
    const { userAction, isCreateUser } = this.props;
    const { colors }  = theme;

    if (userAction) { return <Redirect to="/home" /> }
    return (
      <Wrapper>
          <Title>FAZER LOGIN</Title>

        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={validationForm}
          onSubmit={values => {
            this.props.userSignin(values);
            this.props.userActionDone();
          }}
        >
          {({ errors, touched, values: {
            email,
            password,
          },
            handleChange, setFieldTouched }) => {

            const change = (nameInput: any, e: any) => {
              e.persist();
              handleChange(e);
              setFieldTouched(nameInput, true, false);
            };

            return (
              <Form>

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
                  type="password"
                  width="99%"
                />
                <Btn type="submit" color={colors.primary}>
                  {isCreateUser ? <Spinner size={20} /> : 'Salvar'}
                </Btn>
                <Btn color={colors.pink}>
                  Continuar com o <Image src={require("../assets/imgs/meetup-logo.png")} />
                </Btn>
              </Form>
            )
          }}
        </Formik>
      </Wrapper >
    );
  }
}

// MAP TO PROPS
interface IMapStateToProps {
  userAction: boolean;
  isCreateUser: boolean;
};

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  userAction: selectuserAction(state),
  isCreateUser: selectIsCreateUser(state),
});

interface IMapDispatchToProps {
  userSignin: (payload: {email: string, password: string}) => void;
  userActionDone: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => ({
  userSignin: (payload: {email: string, password: string}) => dispatch(userSignin.started(payload)),
  userActionDone: () => dispatch(userActionDone())
})


// STYLE
const Wrapper = styled.div`
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

const Btn: any = styled(Button)<{ color: string, isAdm?: boolean }>`
&&{
  margin-top: 20px;
  width: ${props => props.isAdm ? '48%' : '100%'};
  background-color: ${props => props.color};
  color: ${props => props.theme.colors.white}
}

&:hover {
  background-color: ${props => props.color} !important;
  opacity: 1;
}
` as typeof Button;

const Image = styled.img`
  width: 70px;
  height: 25px;
  margin-left: 6px;
 `;

const Title = styled.h1`
    color: ${props => props.theme.colors.primary};
    font-size: 35px;
    margin: 2px;
    font-family: monospace !important;
    align-self: flex-start;
`;

const Spinner = styled(CircularProgress)`
&&{
	color: ${props => props.theme.colors.white};;
}
` as typeof CircularProgress;

export default connect(mapStateToProps, mapDispatchToProps)(FormLogin);
