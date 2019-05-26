import * as React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Modal, TextField, Button } from '@material-ui/core';
import { Text } from '../components';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


interface IProps {
  open: boolean;
  handleClose: () => void;
}

const validationForm = Yup.object().shape({
  title: Yup.string().required("Campo obrigatório"),
  date: Yup.string().required("Campo obrigatório"),
  startTime: Yup.string().required("Campo obrigatório"),
  endTime: Yup.string().required("Campo obrigatório"),
  address: Yup.string().required("Campo obrigatório"),
  city: Yup.string().required("Campo obrigatório"),
  state: Yup.string().required("Campo obrigatório"),
  photoUrl: Yup.string(),
});

const initialValues = {
  title: '',
  numberWinners: 0,
  surveyEndDate: '',
  date: '',
  startTime: '',
  endTime: '',
  address: '',
  city: '',
  state: '',
  photoUrl: '',
}

function ModalCreateSurvey({ open, handleClose }: IProps) {
  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <Body>
          <Text size={22}>Cadastrar Enquete</Text>

          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={validationForm}
            onSubmit={values => { console.log('values', values) }}
          >
            {({ errors, touched, values: { title, surveyEndDate, numberWinners, date, startTime, endTime, address, city, state, photoUrl },
              handleChange, setFieldTouched }) => {

              const change = (nameInput: any, e: any) => {
                e.persist();
                handleChange(e);
                setFieldTouched(nameInput, true, false);
              };
              
              console.log('values', title, surveyEndDate, numberWinners, date, startTime, endTime, address, city, state, photoUrl )
              return (
                <Form>
                  <Input
                    label="Titulo"
                    name='title'
                    value={title}
                    helperText={touched.title ? errors.title : ""}
                    error={touched.title && Boolean(errors.title)}
                    onChange={change.bind(null, "title")}
                    width="99%"
                  />

                  <Input
                    label="Encerramento"
                    type="date"
                    name="surveyEndDate"
                    value={surveyEndDate}
                    helperText={touched.surveyEndDate ? errors.surveyEndDate : ""}
                    error={touched.surveyEndDate && Boolean(errors.surveyEndDate)}
                    onChange={change.bind(null, "surveyEndDate")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    width="42%"
                  />

                  <Input
                    label="N° vencedores"
                    name="numberWinners"
                    type="number"
                    value={numberWinners}
                    helperText={touched.numberWinners ? errors.numberWinners : ""}
                    error={touched.numberWinners && Boolean(errors.numberWinners)}
                    onChange={change.bind(null, "numberWinners")}
                    width="30%"
                  />

                  <input
                    accept="image/*"
                    id="button-file"
                    multiple
                    type="file"
                    style={{ display: 'none' }}
                    name="photoUrl"
                    value={photoUrl}
                    onChange={change.bind(null, "photoUrl")}
                  />
                  <label htmlFor="button-file">
                    <BtnUpload variant="contained" component="span">
                      <CloudUploadIcon style={{ marginRight: 3 }} />
                      Foto
                    </BtnUpload>
                  </label>

                  <Input
                    label="Data"
                    type="date"
                    name="date"
                    value={date}
                    helperText={touched.date ? errors.date : ""}
                    error={touched.date && Boolean(errors.date)}
                    onChange={change.bind(null, "date")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    width="42%"
                  />

                  <Input
                    label="Início"
                    type="time"
                    name="startTime"
                    value={startTime}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    helperText={touched.startTime ? errors.startTime : ""}
                    error={touched.startTime && Boolean(errors.startTime)}
                    onChange={change.bind(null, "startTime")}
                    width="25%"
                  />

                  <Input
                    label="Término"
                    type="time"
                    name="endTime"
                    value={endTime}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    helperText={touched.endTime ? errors.endTime : ""}
                    error={touched.endTime && Boolean(errors.endTime)}
                    onChange={change.bind(null, "endTime")}
                    width="25%"
                  />

                  <Input
                    label="Endereço"
                    name='address'
                    value={address}
                    helperText={touched.address ? errors.address : ""}
                    error={touched.address && Boolean(errors.address)}
                    onChange={change.bind(null, "address")}
                    width="99%"
                  />

                  <Input
                    label="Cidade"
                    name='city'
                    value={city}
                    helperText={touched.city ? errors.city : ""}
                    error={touched.city && Boolean(errors.city)}
                    onChange={change.bind(null, "city")}
                    width="48%"
                  />

                  <Input
                    label="Estado"
                    margin="normal"
                    name='state'
                    value={state}
                    helperText={touched.state ? errors.state : ""}
                    error={touched.state && Boolean(errors.state)}
                    onChange={change.bind(null, "state")}
                    width="47%"
                  />

                  <Btn type="submit">Salvar</Btn>
                </Form>
              )
            }}
          </Formik>

        </Body>
      </Modal>
    </div >
  );
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

const Input: any = styled(TextField)<{ width: string }>`
&&{
  margin: 5px;
  width: ${props => props.width};
}
` as typeof TextField;

const Btn: any = styled(Button)`
&&{
  margin-top: 20px;
  width: 100%;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white}
}
` as typeof TextField;

const BtnUpload: any = styled(Button)`
&&{
  margin-top: 15px;
  width: 20%;
  color: ${props => props.theme.colors.gray60}
}
` as typeof TextField;

export default ModalCreateSurvey;
