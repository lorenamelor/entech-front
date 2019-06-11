import * as React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Button, TextField } from '@material-ui/core';
import { CardComent, Text } from '.';

class Event extends React.PureComponent {

  public state = { openModalTechshot: false, expanded: '', };

  public render() {
    return (
      <ComentsContainer>
        <Text bold size={24}>
          Comentários
				</Text>

        <Formik
          initialValues={{ coment: '' }}
          enableReinitialize
          validationSchema={{
            coment: Yup.string().required("Comentário não pode ser um campo vazio"),
          }}
          onSubmit={values => {
            console.log(values)
          }}
        >
          {({ errors, touched, values: { coment },
            handleChange, setFieldTouched }) => {

            const change = (nameInput: any, e: any) => {
              e.persist();
              handleChange(e);
              setFieldTouched(nameInput, true, false);
            };

            return (
              <Form style={{ display: 'flex', flexDirection: 'row' }}>
                <Input
                  label="Comentário"
                  name='coment'
                  value={coment}
                  helperText={touched.coment ? errors.coment : ""}
                  error={touched.coment && Boolean(errors.coment)}
                  onChange={change.bind(null, "coment")}
                  width="99%"
                  multiline
                  rows="4"
                  rowsMax="4"
                />
                <ButtomAction type="submit">
                  >
										</ButtomAction>
              </Form>
            )
          }}
        </Formik>
        <CardComent />
        <CardComent />
        <CardComent />
      </ComentsContainer>
    );
  }
}

// STYLE

const ButtomAction = styled(Button)`
&&{
	background-color: ${props => props.theme.colors.primary};
	color: ${props => props.theme.colors.white};
	text-transform: none;
	font-size: 15px;
  margin: 20px 0px;
  height: 88px;
	width: 25px;
	min-width: 25px;
	border-radius: 35px;
  align-items: center;
  padding: 0px 10px;
} 
` as typeof Button;

const Input: any = styled(TextField)<{ width: string }>`
&&{
  margin: 5px;
  width: ${props => props.width};
}
` as typeof TextField;

const ComentsContainer = styled.div`
	width: 70%;
	display: flex;
	flex-direction: column;	
`;

export default Event;